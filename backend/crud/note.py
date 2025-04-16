from sqlalchemy.ext.asyncio import AsyncSession

from backend.crud.base import CRUDBase
from backend.models.note import Note
from backend.schemas.note import NoteCreate, NoteUpdate


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


note_crud = CRUDNote(Note)
