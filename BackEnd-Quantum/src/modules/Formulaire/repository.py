from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.modules.Formulaire.models import formulair
from src.modules.Formulaire.schemas import UserCreate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

async def get_all_users(db: AsyncSession):
    result = await db.execute(select(formulair))
    return result.scalars().all()

async def create_user(db: AsyncSession, user_data: UserCreate):
    user = formulair(name=user_data.name, email=user_data.email, password=user_data.password)
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

async def get_user_by_email(db: AsyncSession, email: str):
    result = await db.execute(select(formulair).where(formulair.emil == email))
    return result.scalars().first()
