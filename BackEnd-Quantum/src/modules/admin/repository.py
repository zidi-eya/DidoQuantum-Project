from sqlalchemy import select
from src.modules.auth.models import User
from src.database import async_session


class AdminRepository:
   

    async def get_all_users(self) -> list[User]:
        async with async_session() as session:
            result = await session.execute(select(User))
            return result.unique().scalars().all()

    async def update_user_status(self, user_id: int, is_active: bool) -> None:
        async with async_session() as session:
            result = await session.execute(select(User).where(User.id == user_id))
            user = result.unique().scalar_one()
            user.is_active = is_active
            await session.commit()

    async def update_user(self, updated_user: User) -> User:
        async with async_session() as session:
            result = await session.execute(
                select(User).where(User.id == updated_user.id)
            )
            user = result.unique().scalar_one()
            user.is_active = updated_user.is_active
            user.hashed_password = updated_user.hashed_password
            await session.commit()
            await session.refresh(user)
            return user

    async def patch_user(self, user_id: int, **kwargs) -> User:
        async with async_session() as session:
            result = await session.execute(select(User).where(User.id == user_id))
            user = result.unique().scalar_one()
            for key, value in kwargs.items():
                if value is not None:
                    setattr(user, key, value)
            await session.commit()
            await session.refresh(user)
            return user


repository = AdminRepository()
