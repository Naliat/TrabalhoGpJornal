from datetime import datetime, timedelta, timezone
from typing import Union
from jose import jwt, JWTError
from fastapi import HTTPException, status
from .config import settings 

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None) -> str:
    """Cria um token JWT codificado com dados e tempo de expiração."""
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire, "sub": data.get("user_id")})
    
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> dict:
    """Decodifica e valida o token JWT. Levanta 401 em caso de falha."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        
        user_id: str = payload.get("sub")
        if user_id is None:
            raise JWTError("Token inválido: falta 'sub' claim.")
        
        return payload
    
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado.",
            headers={"WWW-Authenticate": "Bearer"},
        )