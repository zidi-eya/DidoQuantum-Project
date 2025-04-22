import logging
from fastapi import APIRouter, Depends, status, Response
from src.modules.auth.schemas import (
    SignInRequest,
    SignUpRequest,
    UserDetail,
    UserBrief,
    SignInResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    ApiKeyCreateRequest,
    ApiKeyResponse,
    ApiKeyListResponse,
    ApiKeyInfoResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    ChangePasswordRequest,
    PatchUserRequest,
)
from src.modules.auth.service import service as auth_service
from src.modules.auth.models import User
from src.modules.auth.constants import UserRole
from src.modules.auth.utils import set_access_token_cookie, set_refresh_token_cookie
from src.exceptions import NotAuthenticated, NotFound, PermissionDenied
from src.modules.email.service import service as email_service
from src.config import app_config
from datetime import datetime

router: APIRouter = APIRouter()


@router.post("/sign-in")
async def sign_in(request: SignInRequest, response: Response) -> SignInResponse:
    try:
        access_token, refresh_token = await auth_service.sign_in(request.email, request.password)

        set_access_token_cookie(response, access_token, request.remember_me)
        set_refresh_token_cookie(response, refresh_token, request.remember_me)
        
        return SignInResponse(access_token=access_token, refresh_token=refresh_token)

    except (NotFound, NotAuthenticated):
        raise NotAuthenticated("Invalid email or password")


@router.post("/sign-out", status_code=status.HTTP_204_NO_CONTENT)
async def sign_out(response: Response) -> Response:
    response.delete_cookie(key="access_token")
    response.delete_cookie(key="refresh_token")


@router.post("/sign-up")
async def sign_up(request: SignUpRequest, response: Response) -> UserBrief:
    new_user = await auth_service.create_user(
        request.full_name,
        request.email,
        [request.role],
        password=request.password,
        is_active=True,
    )

    email_service.send_email(
        new_user.email,
        "Welcome to DiDo Qunatum Pulse",
        f"""
        Dear {new_user.full_name},

       Congratulations and welcome to Dido Quantum Pulse!

We’re excited to inform you that your account has been successfully created. You’re now part of a cutting-edge innovation platform that connects researchers, enterprises, and government agencies to accelerate breakthroughs in artificial intelligence, quantum computing, and cybersecurity.

With your account now active, you can start exploring our ecosystem of AI-powered tools, collaborative opportunities, and transformative resources designed to push the boundaries of innovation.

If you have any questions, feedback, or need assistance, our support team is here for you at support@didoquantumpulse.app. We're committed to ensuring you have a seamless and impactful experience.

Thank you for choosing Dido Quantum Pulse. We’re thrilled to have you onboard and can’t wait to see the future you’ll help shape.

Best regards,
The Dido Quantum Pulse Team
        DiDo Qunatum Pulse Team.
        """,
    )

    email_service.send_email(
        app_config.NOTIFICATION_EMAIL_ADDRESS,
    "New user signed up to DiDo Qunatum Pulse",
        f"""
        Hi there,
        A new user signed up to DiDo Qunatum Pulse!
        Full name: {new_user.full_name}
        Email: {new_user.email}
        Best regards,
        DiDo Qunatum Pulse Team
        """,
    )

    access_token, refresh_token = await auth_service.sign_in(request.email, request.password)

    set_access_token_cookie(response, access_token, False)
    set_refresh_token_cookie(response, refresh_token, False)

    return UserBrief.from_model(new_user)


@router.post("/reset-password", status_code=status.HTTP_202_ACCEPTED)
async def send_reset_password_email(request: ForgotPasswordRequest) -> None:
    logging.info("sending reset password email")
    reset_token = await auth_service.create_password_reset_token(request.email)
    email_service.send_email(
        request.email,
        "Reset your password",
        f"""
       Dear user,
        
        You can reset your password by clicking on the following link:
    {app_config.CLIENT_URL}/auth/reset-password?token={reset_token.token}
        
       Best regards,
        DiDo Qunatum Pulse Team
       """,
    )


@router.post("/reset-password/{token}", status_code=status.HTTP_204_NO_CONTENT)
async def reset_password(token: str, request: ResetPasswordRequest) -> None:
    await auth_service.reset_password(token, request.password)


@router.post("/change-password", status_code=status.HTTP_204_NO_CONTENT)
async def change_password(
    request: ChangePasswordRequest,
    user: User = Depends(auth_service.access_token_validation()),
) -> None:
    if not await user.validate_password(request.old_password):
        raise PermissionDenied("Invalid password")

    await auth_service.patch_user(
        user.id, hashed_password=await User.hash_password(request.new_password)
    )


@router.post("/refresh-token")
async def refresh_token(
    request: RefreshTokenRequest, response: Response
) -> RefreshTokenResponse:
    access_token, refresh_token, subscription_status = await auth_service.refresh_token(request.refresh_token)
    set_access_token_cookie(response, access_token, True)
    set_refresh_token_cookie(response, refresh_token, True)   
    return RefreshTokenResponse(access_token=access_token, refresh_token=refresh_token, subscription_status=subscription_status)


#@router.get("/profile")
#async def profile(
 #   user: User = Depends(auth_service.access_token_validation()),
#) -> UserDetail:
 #   user_details = UserDetail.from_model(user)
  #  if user.subscription.provider == SubscriptionProvider.STRIPE:
   ##     subscription = await stripe_service.get_stripe_subscription(user.subscription.external_subscription_id)
     ##   if not subscription:
       #     raise NotFound("External Subscription not found")
        #subscription_metadata = subscription['items']['data'][0]['price']['product']['metadata']
      #  user_details.subscription.validity_date = datetime.fromtimestamp(subscription.current_period_end)
       # user_details.subscription.status = SubscriptionStatus.from_model(subscription['status'])
     #   user_details.subscription.plan = subscription_metadata['subscription_type'] if 'subscription_type' in subscription_metadata else None
      #  user_details.subscription.provider = SubscriptionProvider.STRIPE

    #return user_details
@router.get("/profile")
async def profile(
    user: User = Depends(auth_service.access_token_validation()),
) -> UserDetail:
    user_details = UserDetail.from_model(user)
    # (add code to retrieve subscription info if needed)
    return user_details
@router.patch("/profile")
async def update_profile(
    request: PatchUserRequest,
    user: User = Depends(auth_service.access_token_validation()),
) -> UserDetail:
    patched_user = await auth_service.patch_user(
        user.id,
        full_name=request.full_name,
    )
    return UserDetail.from_model(patched_user)


@router.get("/api-keys")
async def get_api_key(
    user: User = Depends(auth_service.access_token_validation()),
) -> ApiKeyListResponse:
    tokens = await auth_service.get_api_keys_by_user(user)
    return ApiKeyListResponse.from_model(tokens)


@router.post("/api-keys")
async def create_api_key(
    request: ApiKeyCreateRequest,
    user: User = Depends(auth_service.access_token_validation()),
) -> ApiKeyResponse:
    api_key = await auth_service.create_api_key(user, request)

    
    return ApiKeyResponse.from_model(api_key)


@router.delete("/api-keys/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_api_key(
    id: int,
    user: User = Depends(auth_service.access_token_validation()),
):
    token = await auth_service.get_api_key_by_id(id)

    if token.user_id != user.id:
        raise PermissionDenied("You are not allowed to delete this token")

    await auth_service.remove_api_key(token)


@router.get("/api-keys/info/{api_key}")
async def get_api_key_info(
    api_key: str,
) -> ApiKeyInfoResponse:
    api_key = await auth_service.get_api_key(api_key)
    return ApiKeyInfoResponse.from_model(api_key)
