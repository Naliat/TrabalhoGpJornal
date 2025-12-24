from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime

class NoticiaBase(BaseModel):
    titulo: str = Field(..., min_length=5)
    conteudo: str
    categoria: str
    tags: List[str] = []
    imagem_url: Optional[str] = None 

class NoticiaCreate(NoticiaBase):
    pass

class NoticiaResponse(NoticiaBase):
    id: str
    autor_id: str
    data_publicacao: datetime

    model_config = ConfigDict(from_attributes=True)