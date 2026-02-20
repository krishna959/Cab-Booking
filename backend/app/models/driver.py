from sqlalchemy import Column, Integer, Boolean, Float, ForeignKey # type: ignore
from app.core.database import Base

class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    is_available = Column(Boolean, default=True)
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
