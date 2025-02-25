from sqlalchemy import Column, Integer, String
from src.database import Base

class Formulair(Base):
    __tablename__ = "formulair"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String, index=True)
    lastname = Column(String, unique=True, index=True)
    emil = Column(String, index=True)
    description= Column(String, index=True)



 