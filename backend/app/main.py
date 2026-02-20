from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine
from app.core.exceptions import http_exception_handler

from app.models import user, driver, ride

from app.api import rides, auth, payment
from app.api.websocket import router as ws_router
from app.routes import ride


# Create tables
Base.metadata.create_all(bind=engine)

# Create app only ONCE
app = FastAPI(title=settings.APP_NAME)

# CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/")
def health_check():
    return {"status": "ok"}


# Include routers
app.include_router(auth.router)
app.include_router(rides.router)
app.include_router(ride.router)
app.include_router(payment.router)
app.include_router(ws_router)

# Exception handler
app.add_exception_handler(Exception, http_exception_handler)
