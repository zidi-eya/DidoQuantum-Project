from fastapi import APIRouter, Depends, status

from src.modules.auth.constants import UserRole
from src.modules.auth.service import service as auth_service
from src.modules.email.schemas import SendEmailRequest
from src.modules.email.service import service as email_service

router: APIRouter = APIRouter()


# @router.post("/send", status_code=status.HTTP_202_ACCEPTED)
# async def query(
#     request: SendEmailRequest,
#     _=Depends(
#         auth_service.access_token_validation(required_roles=[UserRole.SUPER_ADMIN]),
#     ),
# ):
#     email_service.send_email(request.recipient, request.subject, request.body)
