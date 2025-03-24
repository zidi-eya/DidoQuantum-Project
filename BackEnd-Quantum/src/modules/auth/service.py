from __future__ import annotations
import jwt
import datetime
import uuid
import json
import re

from fastapi import Depends, Request
from src.modules.auth.constants import UserRole
from src.modules.auth.models import User, Role, ApiKey
from src.modules.auth.repository import repository as auth_repository
from src.modules.auth.schemas import ApiKeyCreateRequest
from src.modules.auth.config import (
    config as auth_config,
    bearer_security,
    api_key_security,
)
from src.exceptions import (
    NotAuthenticated,
    NotFound,
    PermissionDenied,
    AlreadyExists,
    BadRequest
)
from src.constants import RoutePrefixes
from src.modules.auth.constants import ApiKeyPrivilege, RoleType, UserTokenPurpose


class AuthService:

    async def sign_in(self, email, password) -> tuple[str, str, str]:
        user = await self.validate_credentials(email, password)

        access_token = self.generate_access_token(user)
        refresh_token = self.generate_refresh_token(user)

        return access_token, refresh_token

    async def create_user(
        self,
        full_name: str,
        email: str,
        roles: list[str],
        password: str | None = None,
        is_active: bool = False,
      ) -> User:

        existing_user = await self.get_user_by_email(email.lower())
        if existing_user:
            raise AlreadyExists("User with this email already exists")

        user = await auth_repository.create_user(
            full_name.capitalize(), email.lower(), roles, is_active, password
        )

        
        return user

    async def patch_user(self, user_id: int, **kwargs) -> User:
        return await auth_repository.patch_user(user_id, **kwargs)

    async def get_roles_by_types(self, role_type: list[UserRole]) -> list[Role]:
        return await auth_repository.get_roles_by_types(role_type)

    async def get_role_by_name(self, name: str) -> Role | None:
        roles = await auth_repository.get_roles_by_names([name])
        if not roles:
            return None
        return roles[0]

    async def get_user_by_email(self, email: str) -> User | None:
        return await auth_repository.get_user_by_email(email)

    async def get_user_by_id(self, id: int) -> User:
        user = await auth_repository.get_user_by_id(id)
        if not user:
            raise NotFound("User not found")
        return user

    async def get_role_by_id(self, id: int) -> Role:
        role = await auth_repository.get_role_by_id(id)
        if not role:
            raise NotFound("Role not found")
        return role

    async def create_password_reset_token(self, email: str) -> str:
        user = await auth_repository.get_user_by_email(email)
        if not user:
            raise NotFound("User with this email does not exist")
        valid_until = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        return await auth_repository.create_user_token(
            user.id, UserTokenPurpose.PASSWORD_RESET, valid_until
        )

    async def reset_password(self, token: str, password: str) -> None:
        user_token = await auth_repository.get_user_token(
            token, purpose=UserTokenPurpose.PASSWORD_RESET
        )
        if not user_token:
            raise NotAuthenticated("Invalid or expired token")
        user = await self.get_user_by_id(user_token.user_id)

        await auth_repository.patch_user(
            user.id, hashed_password=await User.hash_password(password)
        )
        await auth_repository.remove_user_token(user_token.id)

    async def validate_credentials(self, email: str, password: str) -> User:
        user = await auth_repository.get_user_by_email(email)
        if not user:
            raise NotFound("User with this email does not exist")

        password_valid = await user.validate_password(password)
        if not password_valid:
            raise NotAuthenticated("Invalid password")

        return user

    def generate_access_token(self, user: User) -> str:
        now = datetime.datetime.now()
        return jwt.encode(
            {
                "sub": user.id,
                "iat": now,
                "exp": now + datetime.timedelta(minutes=auth_config.ACCESS_TOKEN_EXPIRE_MINUTES),
               # "subscription_validity" : user.subscription.validity_date.timestamp()
            },
            auth_config.JWT_SECRET_KEY,
            algorithm=auth_config.JWT_ALGORITHM,
        )

    def generate_refresh_token(self, user: User) -> str:
        now = datetime.datetime.now()
        return jwt.encode(
            {
                "sub": user.id,
                "iat": now,
                "exp": now
                + datetime.timedelta(minutes=auth_config.REFRESH_TOKEN_EXPIRE_MINUTES),
            },
            auth_config.JWT_REFRESH_SECRET_KEY,
            algorithm=auth_config.JWT_ALGORITHM,
        )

    async def refresh_token(self, refresh_token: str) -> tuple[str, str, str]:
        try:
            payload = jwt.decode(
                refresh_token,
                auth_config.JWT_REFRESH_SECRET_KEY,
                algorithms=[auth_config.JWT_ALGORITHM],
            )
            user_id = payload.get("sub")
            user = await auth_repository.get_user_by_id(user_id)
            access_token = self.generate_access_token(user)
            refresh_token = self.generate_refresh_token(user)

            return access_token, refresh_token
        except jwt.PyJWTError:
            raise NotAuthenticated("Invalid or expired refresh token")

    async def get_api_keys_by_user(self, user: User) -> list[ApiKey]:
        return await auth_repository.get_api_keys_by_user_id(user.id)

    async def get_api_key_by_id(self, id: int) -> ApiKey:
        api_key = await auth_repository.get_api_key_by_id(id)
        if not api_key:
            raise NotFound("API key not found")
        return api_key

    async def get_api_key(self, key: str) -> ApiKey:
        api_key = await auth_repository.get_api_key(key)
        if not api_key:
            raise NotFound("API key not found")
        return api_key

    async def create_api_key(self, user: User, data: ApiKeyCreateRequest) -> ApiKey:
        key = str(uuid.uuid4())
        api_key = await auth_repository.create_api_key(
            user.id,
            key,
            data.prompt,
            data.valid_until,
        )
        return api_key

    

    async def remove_api_key(self, api_key: ApiKey) -> None:
        await auth_repository.remove_api_key(api_key.id)

    def optional_authentication(self) -> User | None:
        async def get_user(token=Depends(bearer_security)) -> User:
            if token is None:
                return None

            payload = jwt.decode(
                token,
                auth_config.JWT_SECRET_KEY,
                algorithms=[auth_config.JWT_ALGORITHM],
            )

            user_id = payload.get("sub")
            return await auth_repository.get_user_by_id(user_id)

        return get_user

    def api_key_validation(self, required_priviledges: list[ApiKeyPrivilege] = []):
        async def validate_api_key(
            request: Request, api_key=Depends(api_key_security)
        ) -> User:
            db_api_key = await auth_repository.get_api_key(api_key)

            if not db_api_key:
                raise NotAuthenticated("Invalid API key")

            if (
                db_api_key.valid_until
                and db_api_key.valid_until < datetime.date.today()
            ):
                await auth_repository.remove_api_key(db_api_key.id)
                raise NotAuthenticated("API key is expired")

            if ApiKeyPrivilege.PROMPT in required_priviledges and not db_api_key.prompt:
                raise PermissionDenied("Not allowed to perform this action")
            
            return await auth_repository.get_user_by_id(db_api_key.user_id)

        return validate_api_key

    async def get_user_from_token(
        self,
        token: str,
        key: str,
    ) -> User:
        if token is None:
            raise NotAuthenticated()
        try :
            payload = jwt.decode(
                token,
                key,
                algorithms=[auth_config.JWT_ALGORITHM],
            )
        
            user_id = payload.get("sub")
            return await auth_repository.get_user_by_id(user_id)
        except: 
            user = await auth_repository.get_user_by_api_key(token)
            if not user:
                raise NotAuthenticated("invalid token")
            return user



    def access_token_validation(
        self,
        required_roles: list[RoleType] = [],
        forbidden_roles: list[RoleType] = [],
        any_role: list[RoleType] = [],
        validate_subscription: bool = False
    ):
        """
        Create a dependency function for validating access tokens.
        """

        async def validate_token(
            request: Request, token=Depends(bearer_security)
        ) -> User:
            try:
                user = await self.get_user_from_token(
                    token=token, key=auth_config.JWT_SECRET_KEY
                )            

                if not user.is_active:
                    raise NotAuthenticated("User account is not active")
                                
                #if validate_subscription and user.subscription.validity_date < datetime.datetime.now():
                 #    raise PaymentRequired(
                  #              type=PaymentRequiredType.INACTIVE_SUBSCRIPTION,
                   #             client_reference_id=user.client_reference_id,
                    #            subscription_id=user.subscription.subscription_source_id
                     #           if user.subscription
                      #          else None,
                       #     ) 
            

                individual_roles = user.roles
                roles = individual_roles
                is_super_admin = UserRole.SUPER_ADMIN.value in [
                    role.name for role in individual_roles
                ]

                

             

                role_names = [role.name for role in roles]

                if not any_role or all(role not in role_names for role in any_role):
                    if any_role and not required_roles and not forbidden_roles:
                        raise PermissionDenied()

                    if required_roles and not all(
                        role in role_names for role in required_roles
                    ):
                        raise PermissionDenied()

                    if forbidden_roles and any(
                        role in role_names for role in forbidden_roles
                    ):
                        raise PermissionDenied()

                return user
            except jwt.PyJWTError:
                raise NotAuthenticated("Invalid or expired access token")

        return validate_token


service: AuthService = AuthService()



