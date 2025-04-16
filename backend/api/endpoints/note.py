from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.api.validators import check_note_exists
from backend.core.db import get_async_session
from backend.crud.note import note_crud
from backend.schemas.note import NoteRead, NoteCreate, NoteUpdate

router = APIRouter()


@router.post(
    '/',
    response_model=NoteRead,
    response_model_exclude_none=True,
)
async def create_new_note(
    note: NoteCreate,
    session: AsyncSession = Depends(get_async_session),
):
    new_note = await note_crud.create(note, session)
    return new_note


@router.get(
    '/',
    response_model=list[NoteRead],
    response_model_exclude_none=True,
)
async def get_all_notes(
    session: AsyncSession = Depends(get_async_session),
):
    return await note_crud.get_multi(session)


@router.get(
    '/{note_id}',
    response_model=NoteRead,
    response_model_exclude_none=True,
)
async def get_note(
    note_id: int,
    session: AsyncSession = Depends(get_async_session),
):
    return await check_note_exists(note_id, session)


@router.delete(
    '/{note_id}',
    response_model=NoteRead,
    response_model_exclude_none=True,
)
async def remove_note(
        note_id: int,
        session: AsyncSession = Depends(get_async_session),
):
    note = await check_note_exists(
        note_id, session
    )
    note = await note_crud.remove(note, session)
    return note


@router.patch(
    '/{note_id}',
    response_model=NoteRead,
    response_model_exclude_none=True
)
async def partially_update_note(
        note_id: int,
        obj_in: NoteUpdate,
        session: AsyncSession = Depends(get_async_session),
):
    note = await check_note_exists(note_id, session)
    note = await note_crud.update(note, obj_in, session)
    return note


@router.patch(
    '/{note_id}/done',
    response_model=NoteRead,
    response_model_exclude_none=True
)
async def update_note_as_done(
        note_id: int,
        session: AsyncSession = Depends(get_async_session),
):
    note = await check_note_exists(note_id, session)
    note = await note_crud.update_note_as_done(note, session)
    return note
