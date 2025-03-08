from sqlalchemy import Column, Integer, String, DateTime

from src.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    role = Column(String, index=True)
    profile_image = Column(String, nullable=True)  # ✅ Store image URL
    created_at = Column(DateTime(timezone=False), index=True)  # ✅ No timezone
    status= Column(String, index=True)

 
        