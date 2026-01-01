from fastapi import APIRouter, Request, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm 
from passlib.context import CryptContext
from ...models.user import UserCreate, UserResponse, UserUpdate
from ..endpoints.auth import get_current_user, require_role
from typing import Dict, Optional, Any, List

from ...crud.crud_users import CRUDUser

router = APIRouter(
    prefix="/users",
    tags=["Usuários"]
)

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def get_user_crud(request: Request) -> CRUDUser:
    return CRUDUser(db=request.app.state.database)

def get_password_hash(password):
    password_str = str(password) 
    truncated_password = password_str.encode('utf-8')[:72] 
    return pwd_context.hash(truncated_password)


def is_valid_ufc_email(email: str) -> bool:
    allowed_domains = ["@gmail.com", "@alu.ufc.br", "@ufc.br"]
    lower_email = email.lower()
    
    if any(lower_email.endswith(domain) for domain in allowed_domains):
        if lower_email.count('@') == 1:
            return True
    
    return False

@router.get("/", response_model=List[UserResponse])
async def list_all_users(
    current_user: UserResponse = Depends(get_current_user),
    user_crud: CRUDUser = Depends(get_user_crud),
    skip: int = 0, limit: int = 20
    ):
    if current_user.user_type not in ["ADM", "PROFESSOR"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso negado.")

    return await user_crud.get_all_users(skip=skip, limit=limit)

@router.get("/type/{user_type}", response_model=List[UserResponse])
async def list_users_by_type(
    user_type: str,
    current_user: UserResponse = Depends(get_current_user),
    user_crud: CRUDUser = Depends(get_user_crud),
    skip: int = 0, limit: int = 20
    ):
    if current_user.user_type not in ["ADM", "PROFESSOR"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso negado.")

    return await user_crud.get_users_by_type(user_type=user_type.upper(), skip=skip, limit=limit)

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str, user_crud: CRUDUser = Depends(get_user_crud)):
    
    user = await user_crud.get_user_by_id(user_id)

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado.")
    return user

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate, user_crud: CRUDUser = Depends(get_user_crud)):
    
    if not is_valid_ufc_email(user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="O registro requer um endereço de e-mail válido com um dos seguintes domínios: @gmail.com, @alu.ufc.br ou @ufc.br."
        )
    user.password = get_password_hash(user.password)
    new_user = await user_crud.create_user(user)
    
    return {"message": "Usuário registrado com sucesso!", "user": new_user}

@router.put("/{user_id}", status_code=status.HTTP_200_OK)
async def update_user(user_id: str, update_data: UserUpdate, user_crud: CRUDUser = Depends(get_user_crud)):
    updated_user = await user_crud.update_user(user_id, update_data)

    if not updated_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado ou ID inválido.")
    return {"message": "Usuário atualizado com sucesso", "user": updated_user}

@router.delete("/{user_id}", status_code=status.HTTP_200_OK)
async def delete_user(user_id: str, user_crud: CRUDUser = Depends(get_user_crud)):
    deleted = await user_crud.delete_user(user_id)
    
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado ou ID inválido.")
    
    return {"message": "Usuário removido com sucesso"}