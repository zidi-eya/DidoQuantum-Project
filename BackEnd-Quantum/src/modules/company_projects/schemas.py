from pydantic import BaseModel

class CompanyProjectBase(BaseModel):
    title: str
    description: str
    required_tech: str
    goal: str

class CompanyProjectCreate(CompanyProjectBase):
    pass

class CompanyProjectOut(CompanyProjectBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
    