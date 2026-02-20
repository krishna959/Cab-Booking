from fastapi import APIRouter
from app.tasks.payment_tasks import process_payment

router = APIRouter()

@router.post("/rides/{ride_id}/complete")
def complete_ride(ride_id: int):
    amount = 250.0  # demo fare

    task = process_payment.delay(ride_id, amount)

    return {
        "message": "Ride completed, payment processing",
        "task_id": task.id
    }



from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.ride import Ride
from app.services.matching import find_nearest_driver

router = APIRouter(prefix="/rides", tags=["rides"])

@router.post("/request")
def request_ride(data: dict, db: Session = Depends(get_db)):
    ride = Ride(
        user_id=data["user_id"],
        pickup_lat=data["pickup_lat"],
        pickup_lng=data["pickup_lng"],
    )
    db.add(ride)
    db.commit()
    db.refresh(ride)

    driver = find_nearest_driver(db, ride.pickup_lat, ride.pickup_lng)

    if not driver:
        return {"message": "No drivers available", "ride_id": ride.id}

    driver.is_available = False
    ride.driver_id = driver.id
    ride.status = "ASSIGNED"

    db.commit()

    return {
        "ride_id": ride.id,
        "driver_id": driver.id,
        "status": ride.status
    }
