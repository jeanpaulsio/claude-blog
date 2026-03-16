from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://localhost:5432/claude_blog"
    allowed_origins: str = "http://localhost:5173"

    model_config = {"env_file": ".env"}


settings = Settings()
