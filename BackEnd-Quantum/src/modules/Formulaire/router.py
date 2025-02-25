from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.modules.Formulaire.schemas import UserCreate, UserResponse
from src.modules.Formulaire.service import register_user, fetch_all_users


from typing import List

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    try:
        return await register_user(db, user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/getallusers", response_model=List[UserResponse])
async def get_all_users_route(db: AsyncSession = Depends(get_db)):
    return await fetch_all_users(db)