from pydantic import BaseModel, EmailStr, Field

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=72)
    role: str

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=72)
    phone: str

class DriverRegister(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=72)
    phone: str
    vehicle_number: str
    vehicle_type: str

from datetime import datetime

class RideCreate(BaseModel):
    pickup_location: str
    drop_location: str

class RideResponse(BaseModel):
    id: int
    user_id: int
    driver_id: int | None
    pickup_location: str
    drop_location: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True