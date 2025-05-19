from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.modules.researcher_profiles.models import ResearcherProfile
from src.modules.researcher_profiles.schemas import ResearcherProfileCreate

class ResearcherProfileRepository:

    async def create(self, db: AsyncSession, profile: ResearcherProfileCreate, user_id: int) -> ResearcherProfile:
        db_profile = ResearcherProfile(**profile.dict(), user_id=user_id)
        db.add(db_profile)
        await db.commit()  # Await the commit
        await db.refresh(db_profile)  # Await the refresh to ensure the object is updated with database-generated fields like id
        return db_profile

    async def get(self, db: AsyncSession, profile_id: int) -> ResearcherProfile | None:
        result = await db.execute(select(ResearcherProfile).filter(ResearcherProfile.id == profile_id))
        return result.scalar_one_or_none()  # Returns a single instance or None

    async def get_all(self, db: AsyncSession) -> list[ResearcherProfile]:
        result = await db.execute(select(ResearcherProfile))
        return result.scalars().all()  # Gets a list of all results

    async def update(self, db: AsyncSession, profile_id: int, profile: ResearcherProfileCreate) -> ResearcherProfile | None:
        db_profile = await self.get(db, profile_id)
        if db_profile:
            for key, value in profile.dict().items():
                setattr(db_profile, key, value)
            await db.commit()  # Await commit to apply the changes
            await db.refresh(db_profile)  # Await refresh to get the latest state
        return db_profile

    async def delete(self, db: AsyncSession, profile_id: int) -> None:
        db_profile = await self.get(db, profile_id)
        if db_profile:
            await db.delete(db_profile)
            await db.commit()  # Ensure to await commit to finalize the deletion

researcher_profile_repository = ResearcherProfileRepository()
