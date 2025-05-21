from sqlalchemy import  ForeignKey
#from src.modules.auth.models import User  # <-- Import User class here

from src.database import Base
from sqlalchemy.orm import (
    Mapped,
    relationship,
    mapped_column,
)



class Match(Base):
    __tablename__ = "matches"

    id: Mapped[int] = mapped_column(primary_key=True)
    researcher_id: Mapped[int] = mapped_column(ForeignKey("researcher_profiles.id"), nullable=False)
    project_id: Mapped[int] = mapped_column(ForeignKey("company_projects.id"), nullable=False)
    score: Mapped[float] = mapped_column(nullable=False)

    
