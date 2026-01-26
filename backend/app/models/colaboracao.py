from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import Optional

class ColaboracaoCreate(BaseModel):
    name: str
    text: str

class ColaboracaoSchema(ColaboracaoCreate):
    model_config = ConfigDict(populate_by_name=True)
    
    id: Optional[str] = Field(None, alias="_id")
    date: str = Field(default_factory=lambda: datetime.now().strftime("%d/%m/%Y %H:%M"))