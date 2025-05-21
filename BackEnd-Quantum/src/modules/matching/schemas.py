from pydantic import BaseModel

class MatchBase(BaseModel):
    researcher_id: int
    project_id: int
    score: float

class MatchCreate(MatchBase):
    pass

class MatchOut(MatchBase):
    id: int

    class Config:
        orm_mode = True
