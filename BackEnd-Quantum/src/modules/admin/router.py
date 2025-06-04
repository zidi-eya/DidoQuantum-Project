from fastapi import APIRouter, Depends
from src.modules.auth.constants import UserRole
from src.modules.auth.models import User
from src.modules.admin.schemas import (
    UserPatchRequest,
    UserListResponse,
    CreateUserRequest,
)
from src.modules.admin.service import service as admin_service
from src.modules.auth.service import service as auth_service
from src.modules.email.service import service as email_service
from src.modules.auth.schemas import UserDetail
from src.config import app_config

router: APIRouter = APIRouter()



@router.get("/user")
async def get_users(
    _=Depends(
        auth_service.access_token_validation(required_roles=[UserRole.SUPER_ADMIN])
    ),
) -> UserListResponse:
    users = await admin_service.get_all_users()
    return UserListResponse.from_users(users)


@router.post("/user")
async def create_user(
    request: CreateUserRequest,
    _=Depends(
        auth_service.access_token_validation(required_roles=[UserRole.SUPER_ADMIN])
    ),
) -> UserDetail:
    new_user = await auth_service.create_user(
        full_name=request.full_name,
        email=request.email,
        roles=[UserRole.USER],
        is_active=True,
        password=request.password,
    )
    return UserDetail.from_model(new_user)


@router.patch("/user/{id}")
async def update_user(
    id: int,
    request: UserPatchRequest,
    _=Depends(
        auth_service.access_token_validation(required_roles=[UserRole.SUPER_ADMIN])
    ),
) -> UserDetail:
    user = await auth_service.get_user_by_id(id)

    is_active = request.is_active
    if UserRole.SUPER_ADMIN in user.roles and is_active == False:
        # cannot deactivate super admin
        is_active = None

    hashed_password = (
        None if request.password is None else await User.hash_password(request.password)
    )

    patched_user = await auth_service.patch_user(
        user.id,
        is_active=is_active,
        hashed_password=hashed_password,
        full_name=request.full_name,
    )

    if request.is_active == True:
        email_service.send_email(
            to=user.email,
            subject="Your account has been activated",
            body=f"""
            Dear {user.full_name},

            Your account has been activated. You can now sign in by clicking on the following link:
            {app_config.CLIENT_URL}/auth/sign-in

            Best regards,
            DIDO Quantum Pulse Team
            """,
        )

    return UserDetail.from_model(patched_user)
