from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    MONGO_DB_URL: str 
    MONGO_DB_NAME: str
    
    SECRET_KEY: str 
    FRONTEND_URL: str = "http://localhost:5173" 
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    model_config = SettingsConfigDict(env_file='.env', extra='ignore', env_file_encoding='utf-8')

settings = Settings()