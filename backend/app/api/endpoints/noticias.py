from fastapi import APIRouter, Request, HTTPException, status, Depends
from typing import List, Optional
from bson.objectid import ObjectId

from backend.app.models.schemas import Noticia, NoticiaCreate
from backend.app.crud.crud_noticias import CRUDNoticia

router = APIRouter(
    prefix="/noticias",
    tags=["Notícias"]
)

def get_noticia_crud(request: Request) -> CRUDNoticia:
    return CRUDNoticia(db=request.app.state.database)

@router.post("/", response_model=Noticia, status_code=status.HTTP_201_CREATED)
async def criar_noticia(
    noticia: NoticiaCreate, 
    noticia_crud: CRUDNoticia = Depends(get_noticia_crud)
):
    try:
        new_noticia = await noticia_crud.create_noticia(noticia)
        
        if not new_noticia:
             raise HTTPException(status_code=503, detail="Serviço indisponível. DB não conectado/ativo.")
        return new_noticia
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno ao criar notícia: {e}")

@router.get("/", response_model=List[Noticia])
async def listar_noticias(
    noticia_crud: CRUDNoticia = Depends(get_noticia_crud)
):
    noticias_list = await noticia_crud.get_all_noticias() 
    return noticias_list

@router.get("/{noticia_id}", response_model=Noticia)
async def buscar_noticia(
    noticia_id: str, 
    noticia_crud: CRUDNoticia = Depends(get_noticia_crud)
):
    noticia = await noticia_crud.get_noticia(noticia_id)
    
    if noticia:
        return noticia
    else:
        raise HTTPException(status_code=404, detail=f"Notícia com ID '{noticia_id}' não encontrada.")

@router.put("/{noticia_id}", response_model=Noticia)
async def atualizar_noticia(
    noticia_id: str,
    noticia: NoticiaCreate,
    noticia_crud: CRUDNoticia = Depends(get_noticia_crud)
):
    updated = await noticia_crud.update_noticia(noticia_id, noticia)

    if updated:
        return updated
    else:
        raise HTTPException(status_code=404, detail=f"Não foi possível atualizar. ID '{noticia_id}' não encontrado.")

@router.delete("/{noticia_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deletar_noticia(
    noticia_id: str,
    noticia_crud: CRUDNoticia = Depends(get_noticia_crud)
):
    deleted = await noticia_crud.delete_noticia(noticia_id)

    if not deleted:
        raise HTTPException(status_code=404, detail=f"Não foi possível deletar. ID '{noticia_id}' não encontrado.")

    return None 
