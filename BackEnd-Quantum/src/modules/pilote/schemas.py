from pydantic import BaseModel
from datetime import datetime

class ReportMetadata(BaseModel):
    id: int
    filename: str
    uploaded_at: datetime
    path: str
