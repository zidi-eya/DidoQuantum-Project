from src.schemas import CustomSchema


class SendEmailRequest(CustomSchema):
    recipient: str
    subject: str
    body: str
