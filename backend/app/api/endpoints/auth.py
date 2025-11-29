from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from typing import Optional, Annotated
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from ...core.security import create_access_token, decode_access_token

router = APIRouter(prefix="/auth", tags=["auth"])
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto") 
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

UsernameStr = Annotated[str, 3, 50]
PasswordStr = Annotated[str, 6, 72]

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: Optional[str]
    username: str
    email: EmailStr

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

def get_password_hash(password: str) -> str:
    """Gera hash de senha usando argon2."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica senha fornecida contra hash armazenado."""
    return pwd_context.verify(plain_password, hashed_password)


async def get_user_by_id(db: AsyncIOMotorDatabase, user_id: str) -> Optional[dict]:
    """Busca um usuário no DB pelo seu ID, excluindo a senha."""
    try:
        oid = ObjectId(user_id)
    except:
        return None
        
    db_user = await db.users.find_one({"_id": oid}, {"password": 0})
    return db_user

async def get_db(request: Request) -> AsyncIOMotorDatabase:
    """Retorna instância do banco de dados, acessando o estado do app."""
    db = request.app.state.database
    if db is None:
        raise HTTPException(status_code=500, detail="Banco de dados não inicializado ou conexão falhou.")
    return db


async def get_current_user(
    db: AsyncIOMotorDatabase = Depends(get_db),
    token: str = Depends(oauth2_scheme)
) -> UserResponse:
    """Decodifica o token JWT e retorna o usuário autenticado."""
    
    payload = decode_access_token(token)
    
    user_id = payload.get("sub")
    
    user_data = await get_user_by_id(db, user_id)
    
    if user_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas ou usuário não encontrado.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_data["id"] = str(user_data["_id"])
    return UserResponse(**user_data)



@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Registra um novo usuário."""
    
    existing_user = await db.users.find_one({"email": user.email}) 
    if existing_user:
        raise HTTPException(status_code=400, detail="Usuário já existe")

    hashed_password = get_password_hash(user.password) 

    user_dict = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    }
    
    result = await db.users.insert_one(user_dict)
    user_dict["id"] = str(result.inserted_id)
    del user_dict["password"]

    return UserResponse(**user_dict)


@router.post("/login", response_model=TokenResponse)
async def login(user: UserLogin, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Login do usuário. Gera token JWT real."""
    
    db_user = await db.users.find_one({"email": user.email})
    
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Usuário ou senha inválidos")
    access_token = create_access_token(
        data={"user_id": str(db_user["_id"])}
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: UserResponse = Depends(get_current_user)):
    """Retorna dados do usuário logado, protegido por JWT."""
    return current_user