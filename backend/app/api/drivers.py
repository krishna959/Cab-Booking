from fastapi import APIRouter, Depends, HTTPException, status # type: ignore
from sqlalchemy.orm import Session # type: ignore

from app.api.deps import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.driver import Driver

router = APIRouter(
    prefix="/drivers",
    tags=["drivers"]
)


# -------------------------------
# Helper: Ensure driver profile
# -------------------------------
def get_or_create_driver(db: Session, user: User) -> Driver:
    driver = db.query(Driver).filter(
        Driver.user_id == user.id
    ).first()

    if not driver:
        driver = Driver(
            user_id=user.id,
            is_available=False
        )
        db.add(driver)
        db.commit()
        db.refresh(driver)

    return driver


# -------------------------------
# Set driver availability
# -------------------------------
@router.post("/availability")
def set_driver_availability(
    payload: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # 1️⃣ Role check
    if current_user.role != "DRIVER":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only drivers can change availability"
        )

    # 2️⃣ Get or create driver profile
    driver = get_or_create_driver(db, current_user)

    # 3️⃣ Update availability
    is_available = payload.get("is_available")
    if is_available is None:
        raise HTTPException(
            status_code=400,
            detail="is_available field is required"
        )

    driver.is_available = bool(is_available)
    db.commit()

    return {
        "driver_id": driver.id,
        "available": driver.is_available
    }


# -------------------------------
# Get driver profile (optional)
# -------------------------------
@router.get("/me")
def get_driver_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "DRIVER":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a driver"
        )

    driver = db.query(Driver).filter(
        Driver.user_id == current_user.id
    ).first()

    if not driver:
        raise HTTPException(
            status_code=404,
            detail="Driver profile not found"
        )

    return {
        "id": driver.id,
        "user_id": driver.user_id,
        "is_available": driver.is_available,
        "lat": driver.lat,
        "lng": driver.lng,
    }

@router.post("/location")
def update_driver_location(
    payload: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "DRIVER":
        raise HTTPException(status_code=403, detail="Not a driver")

    driver = db.query(Driver).filter(
        Driver.user_id == current_user.id
    ).first()

    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")

    driver.lat = payload.get("lat")
    driver.lng = payload.get("lng")
    db.commit()

    return {
        "lat": driver.lat,
        "lng": driver.lng
    }
