from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List

# Importações internas
from ...core.deps import get_db
from ...api.endpoints.auth import get_current_user 
from ...schemas.edital import EditalCreate, EditalResponse 
from ...crud.crud_editais import (
    create_edital, 
    get_edital_by_id, 
    get_multi_editais, 
    update_edital, 
    delete_edital
    
)
from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel 

router = APIRouter(prefix="/editais", tags=["editais"])


class EditalUpdate(EditalCreate):
    """Permite atualizar parcialmente o edital."""
    pass


@router.post("/", response_model=EditalResponse, status_code=status.HTTP_201_CREATED)
async def create_edital_endpoint(
    edital: EditalCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user) 
):
   
    try:
        user_id = current_user.id
        username = current_user.username
    except AttributeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Erro interno: Usuário autenticado com estrutura inválida."
        )
    db_edital = await create_edital(db, edital, user_id, username)
    
    return db_edital

@router.get("/", response_model=List[EditalResponse])
async def read_editais_endpoint(
    db: AsyncIOMotorDatabase = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=1000)
):
    
    editais = await get_multi_editais(db, skip=skip, limit=limit)
    return editais


@router.get("/{edital_id}", response_model=EditalResponse)
async def read_edital_endpoint(
    edital_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """
    Busca um edital específico pelo seu ID (MongoDB ObjectId). Acesso público.
    """
    edital = await get_edital_by_id(db, edital_id)
    if edital is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Edital não encontrado.")
    return edital


@router.put("/{edital_id}", response_model=EditalResponse)
async def update_edital_endpoint(
    edital_id: str,
    edital_update: EditalUpdate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user) 
):
    db_edital = await get_edital_by_id(db, edital_id)
    if db_edital is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Edital não encontrado.")

    if db_edital.get("professor_id") != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Você não tem permissão para editar este edital."
        )

    updated_edital = await update_edital(db, edital_id, edital_update.model_dump(exclude_unset=True))
    
    if updated_edital is None:
         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Falha ao salvar a atualização.")

    return updated_edital

#  SO pode deletar se for o autor, rota precisa de autenticação
@router.delete("/{edital_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_edital_endpoint(
    edital_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user) 
):
    db_edital = await get_edital_by_id(db, edital_id)
    if db_edital is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Edital não encontrado.")

    if db_edital.get("professor_id") != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Você não tem permissão para deletar este edital."
        )

    if not await delete_edital(db, edital_id):
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Falha ao deletar o edital.")
    
    return