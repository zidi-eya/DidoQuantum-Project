import os
import shutil
from sqlalchemy.ext.asyncio import AsyncSession
from src.modules.Formulaire.repository import create_user, delete_user, update_user
from src.modules.Formulaire.schemas import UserCreate, UserResponse
from src.modules.Formulaire.repository import get_all_users
from fastapi import  UploadFile

async def fetch_all_users(db: AsyncSession):
    return await get_all_users(db)

UPLOAD_DIR = "uploads"

async def save_image(file: UploadFile) -> str:
    """Save the uploaded image to the uploads directory and return its URL."""
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)  # Ensure the directory exists

    file_path = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return f"http://127.0.0.1:8000/{file_path}"  # Generate image URL

async def add_user_service(user: UserCreate, profile_image: UploadFile, db: AsyncSession):
    """Handles image saving and user creation."""
    image_url = await save_image(profile_image) if profile_image else None
    return await create_user(db, user, image_url)

async def remove_user(db: AsyncSession, user_id: int):
    return await delete_user(db, user_id)

async def modify_user(db: AsyncSession, user_id: int, user_data: UserCreate):
    return await update_user(db, user_id, user_data)


