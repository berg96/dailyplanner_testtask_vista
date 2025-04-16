from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_title: str
    app_description: str
    database_url: str
    secret: str

    class Config:
        env_file = '.env'
        extra = 'ignore'


settings = Settings()
