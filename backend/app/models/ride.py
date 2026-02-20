from sqlalchemy import Column, Integer, String, Float, Enum, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.constants.ride_status import RideStatus
from app.constants.payment_status import PaymentStatus
import enum

class RideStatus(enum.Enum):
    REQUESTED = "requested"
    ACCEPTED = "accepted"
    COMPLETED = "completed"
    PAID = "paid"

class Ride(Base):
    __tablename__ = "rides"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=True)

    pickup_lat = Column(Float)
    pickup_lng = Column(Float)
    drop_lat = Column(Float)
    drop_lng = Column(Float)

    status = Column(String, default=RideStatus.REQUESTED)
    payment_status = Column(String, default=PaymentStatus.PENDING)
