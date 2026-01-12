from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from .auth import get_db, get_current_user, UserResponse 
from ...schemas.edital import EditalCreate, EditalResponse
from ...crud.crud_editais import (
    create_edital, 
    get_edital_by_id, 
    get_multi_editais, 
    update_edital, 
    delete_edital
)

router = APIRouter(prefix="/editais") 

class EditalUpdate(EditalCreate):
    pass

@router.post("/", response_model=EditalResponse, status_code=status.HTTP_201_CREATED)
async def create_edital_endpoint(
    edital: EditalCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user) 
):
    if current_user.user_type != "PROFESSOR":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Apenas Professores podem criar editais."
        )
   
    db_edital = await create_edital(db, edital, current_user.id, current_user.username)
    return db_edital

@router.get("/", response_model=List[EditalResponse])
async def read_editais_endpoint(
    db: AsyncIOMotorDatabase = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=1000),
    nome: Optional[str] = Query(None)
):
    editais = await get_multi_editais(db, skip=skip, limit=limit, search=nome)
    return editais

@router.get("/{edital_id}", response_model=EditalResponse)
async def read_edital_endpoint(
    edital_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
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
    if current_user.user_type != "PROFESSOR":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso negado.")
        
    db_edital = await get_edital_by_id(db, edital_id)
    if not db_edital:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Edital não encontrado.")

    if db_edital.get("professor_id") != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Você não é o autor deste edital.")

    updated = await update_edital(db, edital_id, edital_update.model_dump(exclude_unset=True))
    return updated

@router.delete("/{edital_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_edital_endpoint(
    edital_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user) 
):
    if current_user.user_type != "PROFESSOR":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso negado.")
        
    db_edital = await get_edital_by_id(db, edital_id)
    if not db_edital or db_edital.get("professor_id") != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Não autorizado ou não encontrado.")

    await delete_edital(db, edital_id)
    return None