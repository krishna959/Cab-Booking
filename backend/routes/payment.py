from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
import app.models as models
import app.schemas as schemas
from app.dependencies import get_current_user

router = APIRouter(prefix="/pays", tags=["Pays"])

@router.post("/add-balance",response_model = schemas.AddBalanceResponse)
def add_balance(request = schemas.AddbalanceRequest, db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)   
):
    if current_user["role"] != "user":
        raise HTTPException(status_code=403, detail="Only users allowed")

    new_transaction = models.User_Transaction(
        user_id = current_user["user_id"],
        amount = request.amount,
    )
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction

@router.post("/make-payment",response_model = schemas.PaymentResponse)
def makepayment(request = schemas.PaymentRequest,db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)
): 
    if current_user["role"] != "user":
        raise HTTPException(status_code=403, detail="Only users allowed")
    
    user_balance = db.query(models.UserTransaction).filter(
        models.UserTransaction.user_id == current_user["user_id"]
    ).all()

    total_balance = sum(t.amount for t in user_balance)
    if total_balance < request.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance")
    

    decduction = models.UserTransaction(
        user_id = current_user["user_id"],
        amount = -request.amount,
    )
    db.add(decduction)

    payment = models.RidePayment(
        user_id = current_user["user_id"],
        driver_id = request.driver_id,
        amount = request.amount,
        status = "paid",
    )
    db.add(payment)
    driver_income = models.DriverTransaction(
        driver_id = request.driver_id,
        income = request.amount
    )
    db.add(driver_income)

    db.commit()
    db.refresh(payment)
    return payment

@router.get("/driver-income/",response_model = list[schemas.DriverIncomeResponse])
def get_driver_income(db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "driver":
        raise HTTPException(status_code=403, detail="Only drivers allowed")
    
    income = db.query(models.DriverTransaction).filter(
        models.DriverTransaction.driver_id == current_user["user_id"]
    ).all()

    return income
    

