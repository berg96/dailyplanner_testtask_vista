from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.routers import main_router
from backend.core.config import settings

app = FastAPI(title=settings.app_title, description=settings.app_description)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем доступ с любого источника
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP методы (GET, POST, PATCH и т.д.)
    allow_headers=["*"],  # Разрешаем все заголовки
)

app.include_router(main_router, prefix='/api')
