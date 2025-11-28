
from pydantic import BaseModel, Field
from typing import Optional

# --- Esquemas de Notícias ---
class NoticiaBase(BaseModel):
    """Esquema base para dados de notícias."""
    titulo: str = Field(..., example="FastAPI e MongoDB")
    conteudo: str = Field(..., example="Aprendendo a conectar o FastAPI com o MongoDB Atlas.")
    autor: str = Field(..., example="Dev Master")
    data_publicacao: str = Field(..., example="2025-11-27")

class NoticiaCreate(NoticiaBase):
    """Esquema de entrada para POST."""
    pass

class Noticia(NoticiaBase):
    """Esquema completo, incluindo o ID do MongoDB."""
    id: Optional[str] = Field(None, alias="_id")

    class Config:
        populate_by_name = True
        from_attributes = True