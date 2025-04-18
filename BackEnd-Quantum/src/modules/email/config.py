from pydantic_settings import BaseSettings


class SMTPConfig(BaseSettings):
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_TLS: bool
    SMTP_SENDER_ADDRESS: str
    SMTP_USE_AUTHENTICATION: bool = False
    SMTP_USERNAME: str = ""
    SMTP_PASSWORD: str = ""


config: SMTPConfig = SMTPConfig()
