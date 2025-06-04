from sqlalchemy.ext.asyncio import AsyncSession
from src.modules.matching.repository import MatchRepository
from src.modules.matching.schemas import MatchCreate
from src.modules.researcher_profiles.models import ResearcherProfile
from src.modules.company_projects.models import CompanyProject
from src.modules.matching.utils import encode_text, compute_similarity
from sqlalchemy.future import select

class MatchingService:

    def __init__(self, repository: MatchRepository):
        self.repository = repository

    async def generate_matches(self, db: AsyncSession):
        # Récupérer tous les profils de chercheurs et projets
        researchers = await db.execute(select(ResearcherProfile))
        projects = await db.execute(select(CompanyProject))
        researchers = researchers.scalars().all()
        projects = projects.scalars().all()

        for researcher in researchers:
            researcher_embedding = encode_text(researcher.skills + " " + researcher.topics)
            for project in projects:
                project_embedding = encode_text(project.required_tech + " " + project.goal)
                score = compute_similarity(researcher_embedding, project_embedding)
                match = MatchCreate(
                    researcher_id=researcher.id,
                    project_id=project.id,
                    score=score
                )
                await self.repository.create(db, match)

    async def get_matches_for_researcher(self, db: AsyncSession, researcher_id: int):
        return await self.repository.get_by_researcher(db, researcher_id)
