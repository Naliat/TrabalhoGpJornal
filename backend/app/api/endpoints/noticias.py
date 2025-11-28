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