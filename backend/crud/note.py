from sqlalchemy import select, asc
from sqlalchemy.ext.asyncio import AsyncSession

from crud.base import CRUDBase
from models.note import Note
from schemas.note import NoteCreate, NoteUpdate


class CRUDNote(CRUDBase[
    Note,
    NoteCreate,
    NoteUpdate
]):
    async def update_note_as_done(
        self,
        note: Note,
        session: AsyncSession,
    ) -> Note:
        note.is_done = True
        await session.commit()
        await session.refresh(note)
        return note

    async def get_all_notes_sorted_by_date(
        self, session: AsyncSession
    ) -> list[Note]:
        result = await session.execute(
            select(Note).order_by(asc(Note.note_date))
        )
        return result.scalars().all()


note_crud = CRUDNote(Note)
