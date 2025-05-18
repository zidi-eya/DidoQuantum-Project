from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.modules.company_projects.schemas import CompanyProjectCreate, CompanyProjectOut
from src.modules.company_projects.service import company_project_service
from src.modules.auth.service import service

router = APIRouter()

get_current_user = service.access_token_validation()

@router.post("/projects/", response_model=CompanyProjectOut)
async def create_project(project: CompanyProjectCreate, db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)):
    return await company_project_service.create_project(db, project, current_user.id)

@router.get("/projects/{project_id}", response_model=CompanyProjectOut)
async def read_project(project_id: int, db: AsyncSession = Depends(get_db)):
    project = await company_project_service.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/projects/", response_model=list[CompanyProjectOut])
async def read_projects(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db)):
    projects = await company_project_service.get_projects(db)
    return projects[skip: skip + limit]

@router.put("/projects/{project_id}", response_model=CompanyProjectOut)
async def update_project(project_id: int, project: CompanyProjectCreate, db: AsyncSession = Depends(get_db)):
    return await company_project_service.update_project(db, project_id, project)

@router.delete("/projects/{project_id}", status_code=204)
async def delete_project(project_id: int, db: AsyncSession = Depends(get_db)):
    await company_project_service.delete_project(db, project_id)
