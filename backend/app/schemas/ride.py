from pydantic import BaseModel

class RideCreate(BaseModel):
    passenger_id: int
    pickup_lat: float
    pickup_lng: float
    drop_lat: float
    drop_lng: float


class RideAssign(BaseModel):
    driver_id: int


class RideResponse(BaseModel):
    id: int
    passenger_id: int
    driver_id: int | None
    status: str

    class Config:
        from_attributes = True
