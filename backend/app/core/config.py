# deve ser melhor trabalhado depois

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    """
    Configurações do projeto lidas do arquivo .env
    """
    MONGO_DB_URL: Optional[str] = None
    MONGO_DB_NAME: Optional[str] = None
    
    FRONTEND_URL: str = "http://localhost:5173" 
    
    SECRET_KEY: str = "sua_chave_secreta_padrao_muito_insegura_em_dev"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    model_config = SettingsConfigDict(env_file='.env', extra='ignore', env_file_encoding='utf-8')

settings = Settings()