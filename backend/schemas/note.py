from typing import Optional
from datetime import date, datetime
from pydantic import BaseModel, Field


class NoteBase(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=256)
    description: Optional[str] = None
    note_date: Optional[date] = Field(None)
    is_done: Optional[bool] = False


class NoteCreate(NoteBase):
    title: str = Field(..., min_length=1, max_length=256)
    note_date: date = Field(...)


class NoteUpdate(NoteBase):
    pass


class NoteRead(NoteBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
