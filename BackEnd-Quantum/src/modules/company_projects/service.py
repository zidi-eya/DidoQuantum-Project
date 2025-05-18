from sqlalchemy.ext.asyncio import AsyncSession
from src.modules.company_projects.repository import company_project_repository
from src.modules.company_projects.schemas import CompanyProjectCreate

class CompanyProjectService:

    def __init__(self, repository):
        self.repository = repository

    async def create_project(self, db: AsyncSession, project: CompanyProjectCreate, user_id: int):
        return await self.repository.create(db, project, user_id)

    async def get_project(self, db: AsyncSession, project_id: int):
        return await self.repository.get(db, project_id)

    async def get_projects(self, db: AsyncSession):
        return await self.repository.get_all(db)

    async def update_project(self, db: AsyncSession, project_id: int, project: CompanyProjectCreate):
        return await self.repository.update(db, project_id, project)

    async def delete_project(self, db: AsyncSession, project_id: int):
        await self.repository.delete(db, project_id)

company_project_service = CompanyProjectService(company_project_repository)
