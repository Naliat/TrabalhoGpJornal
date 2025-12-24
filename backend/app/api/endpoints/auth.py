import secrets
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm 
from pydantic import BaseModel, EmailStr
from typing import Optional, Literal
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from datetime import datetime, timezone 

from ...core.security import create_access_token, decode_access_token
from ...crud.crud_users import store_reset_token, get_user_by_reset_token, update_user_password

router = APIRouter(prefix="/auth") 
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto") 
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login") 

UserType = Literal["ALUNO", "PROFESSOR", "ADM"] 

class UserCreate(BaseModel):
    username: str 
    email: EmailStr 
    password: str
    user_type: UserType = "ALUNO"
    siape: Optional[str] = None
    tipo_bolsa: Optional[str] = None 

class UserResponse(BaseModel):
    id: Optional[str]
    username: str
    email: EmailStr
    user_type: UserType
    siape: Optional[str] = None
    tipo_bolsa: Optional[str] = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordConfirm(BaseModel):
    token: str
    new_password: str

async def get_db(request: Request) -> AsyncIOMotorDatabase:
    db = request.app.state.database
    if db is None:
        raise HTTPException(status_code=500, detail="Banco de dados não conectado.")
    return db

async def get_current_user(
    db: AsyncIOMotorDatabase = Depends(get_db),
    token: str = Depends(oauth2_scheme)
) -> UserResponse:
    payload = decode_access_token(token)
    user_id = payload.get("user_id") 
    if not user_id:
        raise HTTPException(status_code=401, detail="Token inválido.")
    
    user_data = await db.USUARIO.find_one({"_id": ObjectId(user_id)}, {"password": 0})
    if not user_data:
        raise HTTPException(status_code=401, detail="Usuário não encontrado.")
    
    user_data["id"] = str(user_data["_id"])
    user_data["user_type"] = user_data.get("papel")
    return UserResponse(**user_data)

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    if await db.USUARIO.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Usuário já cadastrado.")

    user_dict = {
        "username": user.username,
        "email": user.email,
        "password": pwd_context.hash(user.password),
        "papel": user.user_type,
        "siape": user.siape,
        "tipo_bolsa": user.tipo_bolsa,
        "created_at": datetime.now(timezone.utc) # Ajustado aqui
    }
    result = await db.USUARIO.insert_one(user_dict)
    user_dict["id"] = str(result.inserted_id)
    user_dict["user_type"] = user_dict["papel"]
    return UserResponse(**user_dict)

@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncIOMotorDatabase = Depends(get_db)):
    db_user = await db.USUARIO.find_one({"email": form_data.username})
    if not db_user or not pwd_context.verify(form_data.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Credenciais incorretas.")

    access_token = create_access_token(data={"user_id": str(db_user["_id"])})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/forgot-password")
async def forgot_password(data: ForgotPasswordRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    token = secrets.token_urlsafe(32)
    result = await store_reset_token(db, data.email, token)
    if result.matched_count == 0:
        return {"message": "Se o e-mail existir, você receberá um token."}
    return {"message": "Token gerado (Simulação)", "reset_token": token}

@router.post("/reset-password")
async def reset_password(data: ResetPasswordConfirm, db: AsyncIOMotorDatabase = Depends(get_db)):
    user = await get_user_by_reset_token(db, data.token)
    if not user:
        raise HTTPException(status_code=400, detail="Token inválido ou expirado.")
    hashed_pwd = pwd_context.hash(data.new_password)
    await update_user_password(db, user["_id"], hashed_pwd)
    return {"message": "Senha atualizada com sucesso!"}

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: UserResponse = Depends(get_current_user)):
    return current_user