from datetime import datetime

from sqlalchemy import Column, String, Text, Boolean, Date, DateTime

from core.db import Base


class Note(Base):
    title = Column(String(256), nullable=False)
    description = Column(Text, nullable=True)
    note_date = Column(Date, nullable=False)
    is_done = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
