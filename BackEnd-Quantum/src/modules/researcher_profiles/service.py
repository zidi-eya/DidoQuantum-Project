from sqlalchemy.ext.asyncio import AsyncSession
from src.modules.researcher_profiles.repository import researcher_profile_repository
from src.modules.researcher_profiles.schemas import ResearcherProfileCreate

class ResearcherProfileService:

    def __init__(self, repository):
        self.repository = repository

    async def create_profile(self, db: AsyncSession, profile: ResearcherProfileCreate, user_id: int):
        return await self.repository.create(db, profile, user_id)

    async def get_profile(self, db: AsyncSession, profile_id: int):
        return await self.repository.get(db, profile_id)

    async def get_profiles(self, db: AsyncSession):
        return await self.repository.get_all(db)

    async def update_profile(self, db: AsyncSession, profile_id: int, profile: ResearcherProfileCreate):
        return await self.repository.update(db, profile_id, profile)

    async def delete_profile(self, db: AsyncSession, profile_id: int):
        await self.repository.delete(db, profile_id)

researcher_profile_service = ResearcherProfileService(researcher_profile_repository)
