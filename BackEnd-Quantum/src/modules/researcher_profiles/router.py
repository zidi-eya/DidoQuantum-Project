from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database import get_db
from src.modules.researcher_profiles.schemas import ResearcherProfileCreate, ResearcherProfileOut
from src.modules.researcher_profiles.service import researcher_profile_service
from src.modules.auth.service import service
from sqlalchemy.ext.asyncio import AsyncSession
from src.modules.auth.models import User  # <-- Import here


router = APIRouter()

get_current_user = service.access_token_validation()

@router.post("/users/researchers/", response_model=ResearcherProfileOut)
async def create_researcher_profile(
    profile: ResearcherProfileCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return await researcher_profile_service.create_profile(db, profile, current_user.id)

@router.get("/researchers/{profile_id}", response_model=ResearcherProfileOut)
async def read_researcher_profile(profile_id: int, db: AsyncSession = Depends(get_db)):
    profile = await researcher_profile_service.get_profile(db, profile_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Researcher profile not found")
    return profile

@router.get("/researchers/", response_model=list[ResearcherProfileOut])
async def read_researcher_profiles(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db)):
    profiles = await researcher_profile_service.get_profiles(db)
    return profiles[skip: skip + limit]

@router.put("/researchers/{profile_id}", response_model=ResearcherProfileOut)
async def update_researcher_profile(profile_id: int, profile: ResearcherProfileCreate, db: Session = Depends(get_db)):
    return await researcher_profile_service.update_profile(db, profile_id, profile)

@router.delete("/researchers/{profile_id}", status_code=204)
async def delete_researcher_profile(profile_id: int, db: AsyncSession = Depends(get_db)):
    await researcher_profile_service.delete_profile(db, profile_id)
