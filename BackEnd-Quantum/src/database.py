from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy import JSON
from typing import Any

# Correct Async DATABASE URL
DATABASE_URL = "postgresql+asyncpg://quantum_user:dido@localhost:5432/dido_quantum_db"

# Async Engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Async Session
SessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False)

Base = declarative_base()

# Declarative Base for Models
class Base(DeclarativeBase):
    type_annotation_map = {dict[str, Any]: JSON}

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
# Dependency for DB session
async def get_db() -> AsyncSession:
    async with SessionLocal() as session:
        yield session


async def close_db() -> None:
    await engine.dispose()

