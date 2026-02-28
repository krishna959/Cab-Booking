from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
import app.models as models
import app.schemas as schemas
from app.dependencies import get_current_user

router = APIRouter(prefix="/rides", tags=["Rides"])


# 🟢 User creates ride
@router.post("/", response_model=schemas.RideResponse)
def create_ride(
    ride: schemas.RideCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "user":
        raise HTTPException(status_code=403, detail="Only users can book rides")

    new_ride = models.Ride(
        user_id=current_user["user_id"],
        pickup_location=ride.pickup_location,
        drop_location=ride.drop_location,
    )

    db.add(new_ride)
    db.commit()
    db.refresh(new_ride)

    return new_ride


# 🟢 Driver view pending rides
@router.get("/pending", response_model=list[schemas.RideResponse])
def view_pending_rides(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "driver":
        raise HTTPException(status_code=403, detail="Only drivers allowed")

    rides = db.query(models.Ride).filter(
        models.Ride.status == "pending"
    ).all()

    return rides


# 🟢 Driver accepts ride
@router.put("/accept/{ride_id}", response_model=schemas.RideResponse)
def accept_ride(
    ride_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "driver":
        raise HTTPException(status_code=403, detail="Only drivers can accept rides")

    ride = db.query(models.Ride).filter(
        models.Ride.id == ride_id
    ).first()

    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")

    if ride.status != "pending":
        raise HTTPException(status_code=400, detail="Ride already accepted or completed")

    ride.driver_id = current_user["user_id"]
    ride.status = "accepted"

    db.commit()
    db.refresh(ride)

    return ride

# 🟢 Driver completes ride
@router.put("/complete/{ride_id}", response_model=schemas.RideResponse)
def complete_ride(
    ride_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "driver":
        raise HTTPException(status_code=403, detail="Only drivers can complete rides")

    ride = db.query(models.Ride).filter(
        models.Ride.id == ride_id,
        models.Ride.driver_id == current_user["user_id"]
    ).first()

    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found or not assigned to you")

    ride.status = "completed"

    db.commit()
    db.refresh(ride)

    return ride

# 🟢 User ride history
@router.get("/user/history", response_model=list[schemas.RideResponse])
def user_ride_history(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "user":
        raise HTTPException(status_code=403, detail="Only users allowed")

    rides = db.query(models.Ride).filter(
        models.Ride.user_id == current_user["user_id"]
    ).all()

    return rides


# 🟢 Driver ride history
@router.get("/driver/history", response_model=list[schemas.RideResponse])
def driver_ride_history(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "driver":
        raise HTTPException(status_code=403, detail="Only drivers allowed")

    rides = db.query(models.Ride).filter(
        models.Ride.driver_id == current_user["user_id"]
    ).all()

    return rides