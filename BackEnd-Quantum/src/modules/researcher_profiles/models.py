from sqlalchemy import  ForeignKey
#from src.modules.auth.models import User  # <-- Import User class here

from src.database import Base
from sqlalchemy.orm import (
    Mapped,
    relationship,
    mapped_column,
)

class ResearcherProfile(Base):
    __tablename__ = "researcher_profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    skills: Mapped[str] = mapped_column(nullable=False)
    topics: Mapped[str] = mapped_column(nullable=False)
    publications: Mapped[str] = mapped_column(nullable=False)
    
    #user: Mapped["User"] = relationship(
     #   "User", back_populates="researcher_profile"
    #)



   