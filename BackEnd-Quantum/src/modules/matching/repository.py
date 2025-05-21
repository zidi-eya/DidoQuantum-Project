from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.modules.matching.models import Match
from src.modules.matching.schemas import MatchCreate

class MatchRepository:

    async def create(self, db: AsyncSession, match: MatchCreate) -> Match:
        db_match = Match(**match.dict())
        db.add(db_match)
        await db.commit()
        await db.refresh(db_match)
        return db_match

    async def get_all(self, db: AsyncSession) -> list[Match]:
        result = await db.execute(select(Match))
        return result.scalars().all()

    async def get_by_researcher(self, db: AsyncSession, researcher_id: int) -> list[Match]:
        result = await db.execute(select(Match).filter(Match.researcher_id == researcher_id))
        return result.scalars().all()
