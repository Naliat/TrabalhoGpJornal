from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List

from .auth import get_db, get_current_user, UserResponse 
from ...schemas.edital import EditalCreate, EditalResponse # Schemas
from ...crud.crud_editais import (
    create_edital, 
    get_edital_by_id, 
    get_multi_editais, 
    update_edital, 
    delete_edital
)
from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel 

router = APIRouter(prefix="/editais") 


class EditalUpdate(EditalCreate):
    """Permite atualizar parcialmente o edital."""
    pass

@router.post("/", response_model=EditalResponse, status_code=status.HTTP_201_CREATED)
async def create_edital_endpoint(
    edital: EditalCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user) 
):
    """
    Cria um novo edital. Requer autenticação JWT e APENAS PERMISSÃO DE PROFESSOR.
    """
    
    if current_user.user_type != "Professor":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Apenas Professores podem criar editais."
        )
   
    professor_id = current_user.id
    professor_username = current_user.username
    
    db_edital = await create_edital(db, edital, professor_id, professor_username)
    
    return db_edital

@router.get("/", response_model=List[EditalResponse])
async def read_editais_endpoint(
    db: AsyncIOMotorDatabase = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=1000)
):
    """
    Lista todos os editais ativos (filtrado por data_fim no futuro/presente). Acesso público.
    """
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
    current_user: UserResponse = Depends(get_current_user) 
):
    """
    Atualiza um edital. Requer autenticação e só permite a atualização pelo criador original (Professor).
    """
    if current_user.user_type != "Professor":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Apenas Professores podem editar editais."
        )
        
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

@router.delete("/{edital_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_edital_endpoint(
    edital_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user) 
):
    """
    Deleta um edital. Requer autenticação e só permite a exclusão pelo criador original (Professor).
    """
    if current_user.user_type != "Professor":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Apenas Professores podem deletar editais."
        )
        
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