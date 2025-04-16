from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from crud.note import note_crud
from models.note import Note


async def check_note_exists(
        note_id: int,
        session: AsyncSession,
) -> Note:
    note = await note_crud.get(
        obj_id=note_id, session=session
    )
    if note is None:
        raise HTTPException(
            status_code=404,
            detail='Запись не найдена!'
        )
    return note
