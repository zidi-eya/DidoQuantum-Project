from sqlalchemy import Column, Integer, String, Text, ForeignKey
from src.database import Base
from sqlalchemy.orm import (
    Mapped,
    relationship,
    mapped_column,
)
class CompanyProject(Base):
    __tablename__ = "company_projects"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    required_tech: Mapped[str] = mapped_column(nullable=False)  # Technologies required for the project
    goal: Mapped[str] = mapped_column(nullable=False)  # The aim or objective of the project

    # Relationship can be defined if user info is needed
