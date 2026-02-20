import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)

# from app.core.logger import logger

# logger.info("Ride created")
# logger.error("Payment failed")
