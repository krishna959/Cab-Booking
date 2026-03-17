from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
import app.models as models
import app.schemas as schemas
from app.dependencies import get_current_user

router = APIRouter(prefix="/pay", tags=["Payment"])

@router.post("/MakePayment")
def payment(
    
):
    pass
