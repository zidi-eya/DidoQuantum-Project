from sqlalchemy.ext.asyncio import AsyncSession
from src.modules.Formulaire.repository import create_user, delete_user, update_user
from src.modules.Formulaire.schemas import UserCreate, UserResponse
from src.modules.Formulaire.repository import get_all_users

async def fetch_all_users(db: AsyncSession):
    return await get_all_users(db)


async def add_user(db: AsyncSession, user: UserCreate):
    return await create_user(db, user)

async def remove_user(db: AsyncSession, user_id: int):
    return await delete_user(db, user_id)

async def modify_user(db: AsyncSession, user_id: int, user_data: UserCreate):
    return await update_user(db, user_id, user_data)


