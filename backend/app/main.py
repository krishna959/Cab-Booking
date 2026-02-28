from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
import app.models as models
from app.schemas import UserRegister, DriverRegister,LoginRequest
from app.auth import verify_password, create_access_token,hash_password
from routes.ride import router as ride_router

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):

    if request.role == "user":
        account = db.query(models.User).filter(
            models.User.email == request.email
        ).first()

    elif request.role == "driver":
        account = db.query(models.Driver).filter(
            models.Driver.email == request.email
        ).first()

    else:
        raise HTTPException(status_code=400, detail="Invalid role")

    if not account:
        raise HTTPException(status_code=401, detail="Invalid email")

    if not verify_password(request.password, account.password):
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_access_token({
        "user_id": account.id,
        "role": request.role
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }

# USER REGISTER
@app.post("/register/user")
def register_user(user: UserRegister, db: Session = Depends(get_db)):

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        phone=user.phone
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}


# DRIVER REGISTER
@app.post("/register/driver")
def register_driver(driver: DriverRegister, db: Session = Depends(get_db)):

    existing_driver = db.query(models.Driver).filter(
        models.Driver.email == driver.email
    ).first()

    if existing_driver:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(driver.password)

    new_driver = models.Driver(
        name=driver.name,
        email=driver.email,
        password=hashed_password,
        phone=driver.phone,
        vehicle_number=driver.vehicle_number,
        vehicle_type=driver.vehicle_type
    )

    db.add(new_driver)
    db.commit()
    db.refresh(new_driver)

    return {"message": "Driver registered successfully"}


from app.dependencies import get_current_user

@app.get("/protected-test")
def protected_test(current_user: dict = Depends(get_current_user)):
    return {
        "message": "You are authenticated",
        "user_data": current_user
    }

app.include_router(ride_router)