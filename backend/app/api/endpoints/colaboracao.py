from fastapi import APIRouter, Request, HTTPException
from ...models.colaboracao import ColaboracaoCreate
from ...crud.crud_colaboracao import CRUDColaboracao
router = APIRouter(prefix="/colaboracoes")

@router.post("/")
async def post_colaboracao(request: Request, obj_in: ColaboracaoCreate):
    db = request.app.state.database
    if db is None:
        raise HTTPException(status_code=500, detail="Banco de dados desconectado")
    
    crud = CRUDColaboracao(db)
    inserted_id = await crud.create(obj_in)
    return {"message": "Sugestão enviada!", "id": inserted_id}

@router.get("/")
async def get_colaboracoes(request: Request):
    db = request.app.state.database
    if db is None:
        return []
    
    crud = CRUDColaboracao(db)
    return await crud.get_multi()