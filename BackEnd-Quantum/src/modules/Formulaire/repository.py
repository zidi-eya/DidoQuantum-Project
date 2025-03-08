from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.modules.Formulaire.models import User
from src.modules.Formulaire.schemas import UserCreate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime

async def get_all_users(db: AsyncSession):
    result = await db.execute(select(User))
    return result.scalars().all()


async def create_user(db: AsyncSession, user: UserCreate, image_url: str):
    new_user = User(
        name=user.name,
        email=user.email,
        role=user.role,
        status=user.status,
        created_at=user.created_at,
        profile_image=image_url  # Store the image URL
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user


async def delete_user(db: AsyncSession, user_id: int):
    user = await db.get(User, user_id)
    if user:
        await db.delete(user)
        await db.commit()
        return user
    return None

async def update_user(db: AsyncSession, user_id: int, user_data: UserCreate):
    user = await db.get(User, user_id)
    if user:
        user.name = user_data.name
        user.email = user_data.email
        user.role = user_data.role
        user.profile_image = user_data.profile_image
        user.status = user_data.status

        await db.commit()
        await db.refresh(user)
        return user
    return None
 
   



    