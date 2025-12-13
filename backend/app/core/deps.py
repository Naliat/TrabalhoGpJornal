from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorDatabase
from jose import jwt, JWTError
from backend.app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_db(request: Request) -> AsyncIOMotorDatabase:
    """
    Retorna a instância do banco de dados MongoDB armazenada em app.state.database.
    Essa função é usada como dependência em endpoints que precisam acessar o banco.
    """
    db = request.app.state.database
    if db is None:
        raise RuntimeError("Banco de dados não está conectado.")
    return db


async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Decodifica o token JWT e retorna o ID do usuário.
    Levanta exceções HTTP em caso de falha.
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido"
            )
        return user_id

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expirado ou inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )
