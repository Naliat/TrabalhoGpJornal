from fastapi import APIRouter, Request, HTTPException, status, Depends
from typing import List, Optional
from backend.app.models.noticia import NoticiaCreate, NoticiaResponse as Noticia
from backend.app.crud.crud_noticias import CRUDNoticia
from backend.app.api.endpoints.auth import get_db, get_current_user, UserResponse

router = APIRouter(
    prefix="/noticias",
    tags=["Notícias"]
)

def get_noticia_crud(request: Request) -> CRUDNoticia:
    return CRUDNoticia(db=request.app.state.database)

@router.post("/", response_model=Noticia, status_code=status.HTTP_201_CREATED)
async def criar_noticia(
    noticia: NoticiaCreate, 
    noticia_crud: CRUDNoticia = Depends(get_noticia_crud),
    current_user: UserResponse = Depends(get_current_user)
):
    try:
        new_noticia = await noticia_crud.create_noticia(noticia, autor_id=current_user.id)
        if not new_noticia:
             raise HTTPException(status_code=503, detail="Serviço indisponível. DB não conectado.")
        return new_noticia
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Erro interno: {e}")

@router.get("/", response_model=List[Noticia])
async def listar_noticias(
    categoria: Optional[str] = None,
    skip: int = 0,
    limit: int = 20,
    noticia_crud: CRUDNoticia = Depends(get_noticia_crud)
):
    return await noticia_crud.get_all_noticias(skip=skip, limit=limit, categoria=categoria) 

@router.get("/{noticia_id}", response_model=Noticia)
async def buscar_noticia(
    noticia_id: str, 
    noticia_crud: CRUDNoticia = Depends(get_noticia_crud)
):
    noticia = await noticia_crud.get_noticia(noticia_id)
    if noticia:
        return noticia
    raise HTTPException(status_code=404, detail=f"ID '{noticia_id}' não encontrado.")

@router.put("/{noticia_id}", response_model=Noticia)
async def atualizar_noticia(
    noticia_id: str,
    noticia_in: NoticiaCreate,
    noticia_crud: CRUDNoticia = Depends(get_noticia_crud),
    current_user: UserResponse = Depends(get_current_user)
):
    noticia_existente = await noticia_crud.get_noticia(noticia_id)
    if not noticia_existente:
        raise HTTPException(status_code=404, detail="Notícia não encontrada.")
    
    if noticia_existente.autor_id != current_user.id:
        raise HTTPException(status_code=403, detail="Você não tem permissão para editar esta notícia.")

    updated = await noticia_crud.update_noticia(noticia_id, noticia_in.model_dump(), autor_id=current_user.id)
    return updated

@router.delete("/{noticia_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deletar_noticia(
    noticia_id: str,
    noticia_crud: CRUDNoticia = Depends(get_noticia_crud),
    current_user: UserResponse = Depends(get_current_user)
):
    deleted = await noticia_crud.delete_noticia(noticia_id, autor_id=current_user.id)
    if not deleted:
        raise HTTPException(status_code=403, detail="Não foi possível deletar. Verifique o ID ou permissão.")
    return None