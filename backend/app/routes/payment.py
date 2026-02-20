from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.razorpay import client
from app.api.deps import get_db
from app.models.ride import Ride

router = APIRouter(prefix="/payment", tags=["payment"])

@router.post("/create-order/{ride_id}")
def create_order(ride_id: int, db: Session = Depends(get_db)):
    ride = db.query(Ride).get(ride_id)

    order = client.order.create({
        "amount": int(ride.fare * 100),
        "currency": "INR",
        "payment_capture": 1
    })

    ride.payment_status = "PENDING"
    db.commit()

    return order
