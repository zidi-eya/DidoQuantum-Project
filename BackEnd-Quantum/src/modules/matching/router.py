from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.modules.matching.service import MatchingService
from src.modules.matching.repository import MatchRepository
from src.modules.matching.schemas import MatchOut
from src.modules.auth.service import service

router = APIRouter()
get_current_user = service.access_token_validation()

matching_service = MatchingService(MatchRepository())

@router.post("/matches/generate", status_code=201)
async def generate_matches(db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)):
    await matching_service.generate_matches(db)
    return {"message": "Matching completed successfully."}

@router.get("/matches/researcher/{researcher_id}", response_model=list[MatchOut])
async def get_matches_for_researcher(researcher_id: int, db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)):
    matches = await matching_service.get_matches_for_researcher(db, researcher_id)
    if not matches:
        raise HTTPException(status_code=404, detail="No matches found for this researcher.")
    return matches
