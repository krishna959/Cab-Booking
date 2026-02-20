from pydantic import BaseModel

class PaymentRequest(BaseModel):
    ride_id: int

class PaymentResponse(BaseModel):
    ride_id: int
    amount: float
    status: str
