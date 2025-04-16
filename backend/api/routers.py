from fastapi import APIRouter

from api.endpoints import note_router

main_router = APIRouter()
main_router.include_router(
    note_router, prefix='/note', tags=['Note']
)
