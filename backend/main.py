from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers import main_router
from core.config import settings

app = FastAPI(title=settings.app_title, description=settings.app_description)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем доступ с любого источника
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP методы (GET, POST, PATCH и т.д.)
    allow_headers=["*"],  # Разрешаем все заголовки
)

app.include_router(main_router, prefix='/api')
