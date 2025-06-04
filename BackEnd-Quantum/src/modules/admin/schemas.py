from src.schemas import CustomSchema
from src.modules.auth.models import User
from src.modules.auth.schemas import UserBrief





class UserListResponse(CustomSchema):
    users: list[UserBrief]

    @staticmethod
    def from_users(users: list[User]) -> "UserListResponse":
        return UserListResponse(users=[UserBrief.from_model(user) for user in users])


class UserPatchRequest(CustomSchema):
    is_active: bool | None = None
    password: str | None = None
    full_name: str | None = None


class CreateUserRequest(CustomSchema):
    full_name: str
    email: str
    password: str
