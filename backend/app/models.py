from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String(255), nullable=False)
    phone = Column(String)

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