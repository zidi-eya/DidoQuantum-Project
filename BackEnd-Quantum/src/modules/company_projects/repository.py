from sqlalchemy.ext.asyncio import AsyncSession
from src.modules.company_projects.models import CompanyProject
from src.modules.company_projects.schemas import CompanyProjectCreate
from sqlalchemy import select

class CompanyProjectRepository:

    async def create(self, db: AsyncSession, project: CompanyProjectCreate, user_id: int) -> CompanyProject:
        db_project = CompanyProject(**project.dict(), user_id=user_id)
        db.add(db_project)
        await db.commit()
        await db.refresh(db_project)
        return db_project
    
    
    

    async def get(self, db: AsyncSession, project_id: int) -> CompanyProject | None:
        result = await db.execute(select(CompanyProject).filter(CompanyProject.id == project_id))
        return result.scalar_one_or_none()

    async def get_all(self, db: AsyncSession) -> list[CompanyProject]:
        result = await db.execute(select(CompanyProject))
        return result.scalars().all()

    async def update(self, db: AsyncSession, project_id: int, project: CompanyProjectCreate) -> CompanyProject | None:
        db_project = await self.get(db, project_id)
        if db_project:
            for key, value in project.dict().items():
                setattr(db_project, key, value)
            await db.commit()
            await db.refresh(db_project)
        return db_project

    async def delete(self, db: AsyncSession, project_id: int) -> None:
        db_project = await self.get(db, project_id)
        if db_project:
            await db.delete(db_project)
            await db.commit()

company_project_repository = CompanyProjectRepository()
