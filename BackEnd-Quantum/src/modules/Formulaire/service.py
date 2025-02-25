from sqlalchemy.ext.asyncio import AsyncSession
from src.modules.Formulaire.repository import create_user, get_user_by_email
from src.modules.Formulaire.schemas import UserCreate, UserResponse
from src.modules.Formulaire.repository import get_all_users

async def fetch_all_users(db: AsyncSession):
    return await get_all_users(db)
async def register_user(db: AsyncSession, user_data: UserCreate):
    # Check if user already exists
    existing_user = await get_user_by_email(db, user_data.email)
    if existing_user:
        raise ValueError("Email already registered")

    # Create new user
    user = await create_user(db, user_data)
    return UserResponse.from_orm(user)
