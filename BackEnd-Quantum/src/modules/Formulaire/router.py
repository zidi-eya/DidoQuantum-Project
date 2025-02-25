from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.modules.Formulaire.schemas import UserCreate, UserResponse
from src.modules.Formulaire.service import  fetch_all_users, create_user, delete_user, update_user


from typing import List

router = APIRouter()


@router.get("/getallusers", response_model=List[UserResponse])
async def get_all_users_route(db: AsyncSession = Depends(get_db)):
    return await fetch_all_users(db)

@router.post("/createuser", response_model=UserResponse)
async def create_user_route(user: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await create_user(db, user)
    return result

@router.delete("/deleteuser/{user_id}", response_model=UserResponse)
async def delete_user_route(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await delete_user(db, user_id)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return result

@router.put("/updateuser/{user_id}", response_model=UserResponse)
async def update_user_route(user_id: int, user: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await update_user(db, user_id, user)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return result