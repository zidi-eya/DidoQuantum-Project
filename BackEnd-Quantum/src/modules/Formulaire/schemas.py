from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: str
    role: str
    profile_image: Optional[str] = None  # ✅ Optional because it will be uploaded separately
    created_at: datetime
    status:str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    profile_image: Optional[str] = None  # ✅ Store full image URL
    created_at: datetime
    status: str

    class Config:
        from_attributes = True # Ensures Pydantic correctly maps SQLAlchemy objects



