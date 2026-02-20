from math import radians, cos, sin, asin, sqrt
from sqlalchemy.orm import Session
from app.models.driver import Driver
from app.models.ride import Ride


def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Haversine formula to calculate distance (km)
    """
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))

    return 6371 * c  # Earth radius in km


def find_nearest_driver(
    db: Session,
    pickup_lat: float,
    pickup_lng: float,
    max_distance_km: float = 5.0
):
    drivers = (
        db.query(Driver)
        .filter(Driver.is_available == True)
        .all()
    )

    nearest_driver = None
    min_distance = float("inf")

    for driver in drivers:
        if driver.latitude is None or driver.longitude is None:
            continue

        distance = calculate_distance(
            pickup_lat,
            pickup_lng,
            driver.latitude,
            driver.longitude
        )

        if distance <= max_distance_km and distance < min_distance:
            min_distance = distance
            nearest_driver = driver

    return nearest_driver


def assign_driver_to_ride(db: Session, ride: Ride):
    driver = find_nearest_driver(
        db,
        ride.pickup_latitude,
        ride.pickup_longitude
    )

    if not driver:
        return None

    ride.driver_id = driver.id
    ride.status = "ASSIGNED"
    driver.is_available = False

    db.commit()
    db.refresh(ride)

    return driver
