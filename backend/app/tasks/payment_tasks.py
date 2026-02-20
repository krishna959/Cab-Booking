from app.core.celery_app import celery_app
import time

@celery_app.task
def process_payment(ride_id: int, amount: float):
    time.sleep(3)  # simulate delay
    return {
        "ride_id": ride_id,
        "amount": amount,
        "status": "PAID"
    }
