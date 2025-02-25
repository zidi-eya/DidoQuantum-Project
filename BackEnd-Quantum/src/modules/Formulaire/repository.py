from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.modules.Formulaire.models import Formulair
from src.modules.Formulaire.schemas import UserCreate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

async def get_all_users(db: AsyncSession):
    result = await db.execute(select(Formulair))
    return result.scalars().all()


async def create_user(db: AsyncSession, user: UserCreate):
    new_user = Formulair(
        firstname=user.firstname,
        lastname=user.lastname,
        emil=user.emil,  
        description=user.description
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

async def delete_user(db: AsyncSession, user_id: int):
    user = await db.get(Formulair, user_id)
    if user:
        await db.delete(user)
        await db.commit()
        return user
    return None

async def update_user(db: AsyncSession, user_id: int, user_data: UserCreate):
    user = await db.get(Formulair, user_id)
    if user:
        user.firstname = user_data.firstname
        user.lastname = user_data.lastname
        user.emil = user_data.emil
        user.description = user_data.description
        await db.commit()
        await db.refresh(user)
        return user
    return None

