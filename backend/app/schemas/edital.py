from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class EditalBase(BaseModel):
    
    title: str = Field(..., description="Título do Edital.")
    descricao: str = Field(..., description="Descrição detalhada do Edital.")
    data_inicio: datetime = Field(..., description="Data de início da validade/inscrição.")
    data_fim: datetime = Field(..., description="Data de fim da validade/inscrição.")
    tags: List[str] = Field(default_factory=list, description="Tags para categorizar o edital.")

class EditalCreate(EditalBase):
    pass

class EditalResponse(EditalBase):

    id: str = Field(..., alias="_id", description="ID único do MongoDB.")
    professor_id: str = Field(..., description="ID do Professor que criou o Edital.")
    professor_username: str = Field(..., description="Username do Professor que criou o Edital.")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }