from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, ConfigDict

class ResumeBase(BaseModel):
    title: str
    content: str

class ResumeCreate(ResumeBase):
    author_id: UUID

class ResumeUpdate(BaseModel):
    title: str | None = None
    content: str | None = None


class ImprovementHistoryBase(BaseModel):
    content_before: str
    content_after: str


class ImprovementHistory(ImprovementHistoryBase):
    model_config = ConfigDict(from_attributes=True)  #  Same as "orm_mode=True"

    id: UUID
    resume_id: UUID
    created_at: datetime


class Resume(ResumeBase):
    model_config = ConfigDict(from_attributes=True)  # Same as "orm_mode=True"
    
    id: UUID
    author_id: UUID
    created_at: datetime
    updated_at: datetime