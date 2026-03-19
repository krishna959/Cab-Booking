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
    # balance = Column(Float, default=0)

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


class UserTransaction(Base):  # An user can add their amt manually
    __tablename__ = "user_transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    amount = Column(Float, nullable=False)
    user = relationship("User")

    

class DriverTransaction(Base): # driver received amt from user via UPI
    __tablename__ = "Driver_transactions"
    id = Column(Integer, primary_key=True, index=True)
    driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    income = Column(Float,default = 0)
    driver = relationship("Driver")




class RidePayment(Base):    # Ride payment done by which user to which driver
    __tablename__ = "Ride_transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=True)
    status = Column(String(50), default="pending")  
    created_at = Column(DateTime, default=datetime.utcnow)
    amount = Column(Float,default =0)
    user = relationship("User")
    driver = relationship("Driver")

