from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.ride import Ride
from app.schemas.ride import RideCreate, RideAssign

router = APIRouter(prefix="/rides", tags=["Rides"])
@router.post("/")
def request_ride(data: RideCreate, db: Session = Depends(get_db)):
    ride = Ride(
        passenger_id=data.passenger_id,
        pickup_lat=data.pickup_lat,
        pickup_lng=data.pickup_lng,
        drop_lat=data.drop_lat,
        drop_lng=data.drop_lng,
    )
    db.add(ride)
    db.commit()
    db.refresh(ride)
    return ride

@router.put("/{ride_id}/assign")
def assign_driver(
    ride_id: int,
    data: RideAssign,
    db: Session = Depends(get_db)
):
    ride = db.query(Ride).filter(Ride.id == ride_id).first()

    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")

    ride.driver_id = data.driver_id
    ride.status = "ASSIGNED"
    db.commit()
    return {"message": "Driver assigned"}

@router.put("/{ride_id}/start")
def start_ride(ride_id: int, db: Session = Depends(get_db)):
    ride = db.query(Ride).filter(Ride.id == ride_id).first()

    if ride.status != "ASSIGNED":
        raise HTTPException(status_code=400, detail="Ride not assigned")

    ride.status = "STARTED"
    db.commit()
    return {"message": "Ride started"}

@router.put("/{ride_id}/complete")
def complete_ride(ride_id: int, db: Session = Depends(get_db)):
    ride = db.query(Ride).filter(Ride.id == ride_id).first()

    if ride.status != "STARTED":
        raise HTTPException(status_code=400, detail="Ride not started")

    ride.status = "COMPLETED"
    db.commit()
    return {"message": "Ride completed"}


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.ride import Ride
from app.services.matching import assign_driver_to_ride

router = APIRouter()


@router.post("/rides/{ride_id}/match")
def match_ride(ride_id: int, db: Session = Depends(get_db)):
    ride = db.query(Ride).filter(Ride.id == ride_id).first()

    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")

    if ride.status != "REQUESTED":
        raise HTTPException(
            status_code=400,
            detail="Ride is not in REQUESTED state"
        )

    driver = assign_driver_to_ride(db, ride)

    if not driver:
        raise HTTPException(
            status_code=404,
            detail="No available drivers nearby"
        )

    return {
        "message": "Driver assigned successfully",
        "driver_id": driver.id,
        "ride_id": ride.id
    }

