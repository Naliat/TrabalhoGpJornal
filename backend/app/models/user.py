from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from .enum.type_user import UserType
from datetime import datetime


# --- Esquemas de Usuários ---
class UserBase(BaseModel):
    username: str = Field(..., min_length=3)
    matricula: Optional[str] = Field(None, description="Matricula do usuário se aplicável")
    email: EmailStr
    user_type: UserType = Field(..., description="Tipo de usuário do sistema")

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)
    
class UserResponse(UserBase):
    id: str
    data_criacao: Optional[datetime] = None

class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3)
    matricula: Optional[str] = None
    email: Optional[EmailStr] = None
    user_type: Optional[UserType] = None
