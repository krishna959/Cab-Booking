from http.client import HTTPException
from app.models.driver import Driver
from app.models.user import User
from app.services.matching import assign_driver_to_ride
from fastapi import APIRouter, Depends # type: ignore
from sqlalchemy.orm import Session # type: ignore
from app.schemas.ride import RideCreate
from app.models.ride import Ride
from app.api.deps import get_db
from app.api.deps import get_current_user
from app.services.pricing import calculate_price

router = APIRouter(prefix="/rides", tags=["rides"])

@router.post("/request")
def request_ride(
    pickup_latitude: float,
    pickup_longitude: float,
    db: Session = Depends(get_db),
):
    ride = Ride(
        pickup_latitude=pickup_latitude,
        pickup_longitude=pickup_longitude,
        status="REQUESTED"
    )

    db.add(ride)
    db.commit()
    db.refresh(ride)

    driver = assign_driver_to_ride(db, ride)

    if not driver:
        raise HTTPException(
            status_code=404,
            detail="No drivers available nearby"
        )

    return {
        "ride_id": ride.id,
        "driver_id": driver.id,
        "status": ride.status
    }

@router.post("/{ride_id}/accept")
def accept_ride(
    ride_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    ride = db.query(Ride).filter(Ride.id == ride_id).first()

    ride.status = "ACCEPTED"
    db.commit()

    return {"ride_id": ride.id, "status": ride.status}

@router.get("/{ride_id}/driver-location")
def get_driver_location(
    ride_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ride = db.query(Ride).filter(Ride.id == ride_id).first()

    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")

    if ride.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your ride")

    driver = db.query(Driver).filter(
        Driver.id == ride.driver_id
    ).first()

    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")

    return {
        "lat": driver.lat,
        "lng": driver.lng
    }
