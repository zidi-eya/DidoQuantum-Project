import datetime

from src.schemas import CustomSchema
from src.modules.auth.models import User, ApiKey
from enum import Enum, IntEnum
#from src.modules.subscription.constant import ProviderType as SubscriptionProvider

class SignUpRequest(CustomSchema):
    full_name: str
    email: str
    password: str
    role: str


class SignInRequest(CustomSchema):
    email: str
    password: str
    remember_me: bool = False


class SignInResponse(CustomSchema):
    access_token: str
    refresh_token: str


class ForgotPasswordRequest(CustomSchema):
    email: str


class ResetPasswordRequest(CustomSchema):
    password: str


class ChangePasswordRequest(CustomSchema):
    old_password: str
    new_password: str


class UserBrief(CustomSchema):
    id: int
    full_name: str
    email: str
    is_active: bool
    roles: list[str]
   # client_reference_id: str

    @staticmethod
    def from_model(user: User) -> "UserBrief":
        return UserBrief(
            id=user.id,
            full_name=user.full_name,
            email=user.email,
            is_active=user.is_active,
            roles=[role.name for role in user.roles],
        )
    
class SubscriptionStatus(IntEnum):
    TRIAL = 0,
    ACTIVE = 1,
    PAUSED = 3,
    UNPAID = 4,
    CANCELLED = 5
    @staticmethod
    def from_model(stripe_subscription_status: str) -> "SubscriptionStatus":
        if stripe_subscription_status == "trialing":
            return SubscriptionStatus.TRIAL
        if stripe_subscription_status == "active":
            return SubscriptionStatus.ACTIVE
        if stripe_subscription_status == "paused":
            return SubscriptionStatus.PAUSED
        if stripe_subscription_status == "canceled":
            return SubscriptionStatus.CANCELLED
        if stripe_subscription_status == "unpaid":
            return SubscriptionStatus.UNPAID    
    
class SubscriptionPlan(IntEnum):
    FREE = 0
    BASIC = 1
    PREMIUM = 2

#class SubscriptionDetail(CustomSchema):
    #validity_date: datetime.datetime
    #plan: SubscriptionPlan
    #provider: int
   # status: SubscriptionStatus

class UserDetail(CustomSchema):
    id: int
    full_name: str
    email: str
    is_active: bool
    roles: list[str]
    #client_reference_id: str
   # subscription: SubscriptionDetail

    @staticmethod
    def from_model(user: User) -> "UserDetail":
        return UserDetail(
            id=user.id,
            full_name=user.full_name,
            email=user.email,
            is_active=user.is_active,
            roles=[role.name for role in user.roles],
            #client_reference_id=user.client_reference_id,
           # subscription = SubscriptionDetail(
               # validity_date = user.subscription.validity_date,
              #  plan = SubscriptionPlan.FREE,
              #  provider = SubscriptionProvider.INTERNAL,
               # status = SubscriptionStatus.TRIAL if user.subscription.validity_date > datetime.datetime.now() else SubscriptionStatus.CANCELLED
           # )
        )



class RefreshTokenRequest(CustomSchema):
    refresh_token: str


class RefreshTokenResponse(CustomSchema):
    access_token: str
    refresh_token: str
    #subscription_status: int



class ApiKeyCreateRequest(CustomSchema):
    prompt: bool
    valid_until: datetime.date | None = None


class ApiKeyResponse(CustomSchema):
    id: int
    key: str
    user_id: int
    prompt: bool
    valid_until: datetime.date | None = None

    @staticmethod
    def from_model(api_key: ApiKey) -> "ApiKeyResponse":
        return ApiKeyResponse(
            id=api_key.id,            
            key=api_key.key,
            user_id=api_key.user_id,
            prompt=api_key.prompt,           
            valid_until=api_key.valid_until,
        )


class ApiKeyListResponse(CustomSchema):
    api_keys: list[ApiKeyResponse]

    @staticmethod
    def from_model(api_keys: list[ApiKey]) -> "ApiKeyListResponse":
        return ApiKeyListResponse(
            api_keys=[ApiKeyResponse.from_model(api_key) for api_key in api_keys]
        )


class ApiKeyInfoResponse(CustomSchema):
    key: str
    prompt: bool
    valid_until: datetime.date | None = None

    @staticmethod
    def from_model(api_key: ApiKey) -> "ApiKeyInfoResponse":
        return ApiKeyInfoResponse(
            key=api_key.key,
            prompt=api_key.prompt,
            valid_until=api_key.valid_until,
        )


class PatchUserRequest(CustomSchema):
    full_name: str | None = None
