from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.ride import Ride, RideStatus
from app.schemas.payment import PaymentRequest, PaymentResponse

router = APIRouter(prefix="/payment", tags=["Payment"])

@router.post("/pay", response_model=PaymentResponse)
def pay_for_ride(data: PaymentRequest, db: Session = Depends(get_db)):
    ride = db.query(Ride).filter(Ride.id == data.ride_id).first()

    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")

    if ride.status != RideStatus.COMPLETED:
        raise HTTPException(status_code=400, detail="Ride not completed yet")

    ride.status = RideStatus.PAID
    db.commit()
    db.refresh(ride)

    return PaymentResponse(
        ride_id=ride.id,
        amount=ride.fare,
        status="PAID"
    )

@router.post("/verify/{ride_id}")
def verify_payment(ride_id: int, db: Session = Depends(get_db)):
    ride = db.query(Ride).get(ride_id)

    ride.payment_status = "PAID"
    ride.status = "COMPLETED"
    db.commit()

    return {"message": "Payment successful"}
