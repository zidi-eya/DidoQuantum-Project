from pydantic import BaseModel

class ResearcherProfileBase(BaseModel):
    skills: str
    topics: str
    publications: str

class ResearcherProfileCreate(ResearcherProfileBase):
    pass

class ResearcherProfileOut(ResearcherProfileBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
