from src.modules.auth.models import User
from src.modules.admin.repository import repository as admin_repository


class AdminService:
    

    async def get_all_users(self) -> list[User]:
        return await admin_repository.get_all_users()

    async def update_user(self, user: User) -> User:
        return await admin_repository.update_user(user)


service = AdminService()
