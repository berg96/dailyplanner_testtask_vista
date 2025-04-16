from fastapi import FastAPI

from backend.api.routers import main_router
from backend.core.config import settings

app = FastAPI(title=settings.app_title, description=settings.app_description)

app.include_router(main_router, prefix='/api')
