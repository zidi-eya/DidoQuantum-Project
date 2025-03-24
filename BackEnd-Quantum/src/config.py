#from pydantic import PostgresDsn
from pydantic_settings import BaseSettings
#from src.constants import Environment


class AppConfig(BaseSettings):
    #ENVIRONMENT: Environment = Environment.PRODUCTION
    CORS_ORIGINS: list[str]
    CORS_ORIGINS_REGEX: str | None = None
    CORS_HEADERS: list[str]
    DEFAULT_USER_NAME: str
    DEFAULT_USER_EMAIL: str
    DEFAULT_USER_PASSWORD: str
    TESTER_USER_NAME: str
    TESTER_USER_EMAIL: str
    TESTER_USER_PASSWORD: str
    #NOTIFICATION_EMAIL_ADDRESS: str
    #CLIENT_URL: str
    #AUDIO_FILE_SIZE: int
    #TEXT_FILE_SIZE: int
    #STRIPE_API_KEY: str
    #STRIPE_ENPOINT_SECRET: str
    #TRIAL_PERIOD_DAYS: int
    COOKIES_CONFIG_SAMESITE: str



app_config: AppConfig = AppConfig()
    