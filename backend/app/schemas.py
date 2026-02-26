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