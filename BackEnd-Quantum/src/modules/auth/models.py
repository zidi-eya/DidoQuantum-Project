import secrets
import bcrypt
import datetime 
import asyncio

from typing import List
from sqlalchemy import (
    Column,
    Table,
    ForeignKey,
)
from src.database import Base
from sqlalchemy.orm import (
    Mapped,
    relationship,
    mapped_column,
)
from src.modules.auth.constants import UserRole
#from src.modules.subscription.models import Subscription

user_role_association_table = Table(
    "user_role",
    Base.metadata,
    Column("user_id", ForeignKey("user.id"), primary_key=True),
    Column("role_id", ForeignKey("role.id"), primary_key=True),
)


class Role(Base):
    __tablename__ = "role"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    type: Mapped[str] = mapped_column(nullable=False)


class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(nullable=False, unique=True)
    hashed_password: Mapped[bytes] = mapped_column(nullable=True)
    is_active: Mapped[bool] = mapped_column(nullable=False, default=True)
    roles: Mapped[List[Role]] = relationship(
        secondary=user_role_association_table, lazy="joined"
    )

    @staticmethod
    def generate_random_password() -> str:
        return secrets.token_urlsafe(13)

    @staticmethod
    async def hash_password(password: str) -> str:
        #return bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, bcrypt.hashpw, password.encode(), bcrypt.gensalt())

    @property
    def is_tester(self) -> bool:
        return any(role.name == UserRole.TESTER.value for role in self.roles)

    async def validate_password(self, password: str) -> bool:
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, bcrypt.checkpw, password.encode(), self.hashed_password)
        #return bcrypt.checkpw(password.encode(), self.hashed_password)

  

class UserToken(Base):
    __tablename__ = "user_token"
    id: Mapped[int] = mapped_column(primary_key=True)
    token: Mapped[str] = mapped_column(nullable=False)
    purpose: Mapped[str] = mapped_column(nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    valid_until: Mapped[datetime.datetime] = mapped_column(nullable=False)


class ApiKey(Base):
    __tablename__ = "api_key"
    id: Mapped[int] = mapped_column(primary_key=True)
    key: Mapped[str] = mapped_column(nullable=False)
    prompt: Mapped[bool] = mapped_column(nullable=False, default=False)
    valid_until: Mapped[datetime.date] = mapped_column(nullable=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
       # name: Mapped[str] = mapped_column(nullable=False)


