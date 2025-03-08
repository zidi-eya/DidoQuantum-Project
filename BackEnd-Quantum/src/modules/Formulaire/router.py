from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Request, Form
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.modules.Formulaire.schemas import UserCreate, UserResponse
from src.modules.Formulaire.service import  fetch_all_users, add_user_service, delete_user, update_user
from datetime import datetime
from typing import List, Optional

router = APIRouter()


@router.get("/getallusers", response_model=List[UserResponse])
async def get_all_users_route(db: AsyncSession = Depends(get_db)):
    return await fetch_all_users(db)

@router.post("/createuser", response_model=UserResponse)
async def create_user_route(
    name: str = Form(...),
    email: str = Form(...),
    role: str = Form(...),
    status: str = Form(...),
    created_at: datetime = Form(...),
    profile_image: Optional[UploadFile] = File(None),
    db: AsyncSession = Depends(get_db),
):
    """Handles user creation with optional image upload"""

    # Ensure created_at is offset-naive
    if created_at.tzinfo is not None:
        created_at_naive = created_at.astimezone(tz=None).replace(tzinfo=None)
    else:
        created_at_naive = created_at

    user_data = UserCreate(
        name=name,
        email=email,
        role=role,
        status=status,
        created_at=created_at_naive  # Use the naive datetime
    )

    try:
        new_user = await add_user_service(user_data, profile_image, db)
        return new_user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
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