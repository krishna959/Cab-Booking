from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
import app.models as models
import app.schemas as schemas
from app.dependencies import get_current_user

router = APIRouter(prefix="/pay", tags=["Payment"])

@router.post("/Add-balance",response_model = schemas.Balance)
def balance(

    
):
    pass

@router.get("/check-balance")
def check_balance(

):
    pass

@router.post("/Make-payment")
def makepayment(

):
    pass
