from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Cab Booking API"
    ENV: str = "development"
    # 🔐 JWT
    SECRET_KEY: str 
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # 🗄 Database
    DATABASE_URL: str = "DATABASE_URL"

    # 💳 Razorpay
    RAZORPAY_KEY_ID: str = "RAZORPAY_KEY_ID"
    RAZORPAY_KEY_SECRET: str = "RAZORPAY_KEY_SECRET"

    class Config:
        env_file = ".env"


settings = Settings()
model_config = {
    "env_file": ".env",
    "extra": "ignore"
}
