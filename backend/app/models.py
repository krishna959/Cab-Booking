from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from app.database import Base
from sqlalchemy import Boolean, DateTime
from datetime import datetime
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String(255), nullable=False)
    phone = Column(String)
    role = Column(String(20), default="user")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Driver(Base):
    __tablename__ = "drivers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String(255), nullable=False)
    phone = Column(String)
    vehicle_number = Column(String)
    vehicle_type = Column(String)
    is_available = Column(Boolean, default=True)
    current_lat = Column(Float)
    current_lng = Column(Float)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

class Ride(Base):
    __tablename__ = "rides"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=True)

    pickup_location = Column(String(255), nullable=False)
    drop_location = Column(String(255), nullable=False)

    status = Column(String(50), default="pending")  
    # pending, accepted, completed, cancelled

    created_at = Column(DateTime, default=datetime.utcnow)

    # relationships
    user = relationship("User")
    driver = relationship("Driver")