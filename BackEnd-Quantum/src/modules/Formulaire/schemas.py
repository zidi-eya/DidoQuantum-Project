from pydantic import BaseModel

class UserCreate(BaseModel):
    firstname: str
    lastname: str
    emil: str
    description: str

class UserResponse(BaseModel):
    id: int
    firstname: str
    lastname: str
    emil: str
    description: str

    class Config:
        from_attributes = True



