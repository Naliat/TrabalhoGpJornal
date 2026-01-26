import google.generativeai as genai
from fastapi import APIRouter, Request, HTTPException
from ...models.colaboracao import ColaboracaoCreate
from ...crud.crud_colaboracao import CRUDColaboracao
from ...core.config import settings

router = APIRouter(prefix="/colaboracoes")

if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)
    safety_settings = [
        {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_ONLY_HIGH"},
    ]
    model = genai.GenerativeModel('gemini-1.5-flash', safety_settings=safety_settings)
else:
    model = None

async def is_toxic(text: str) -> bool:
    if not model:
        return False
    try:
        prompt = (
            "Você é um moderador de feedback para um jornal universitário. "
            "Sua prioridade é capturar sugestões de melhoria visual, páginas e funções. "
            "Mesmo que o usuário use linguagem rude ou xingue o site/sistema, se houver uma sugestão útil "
            "(ex: 'melhorar tela de login', 'ajustar visual'), você deve permitir (responder 'N'). "
            "Responda 'S' APENAS se houver ataques pessoais diretos, discurso de ódio ou palavrões gratuitos sem sugestão técnica. "
            f"Analise o texto e responda APENAS 'S' ou 'N': '{text}'"
        )
        response = await model.generate_content_async(prompt)
        clean_res = response.text.strip().upper()
        return "S" in clean_res and "N" not in clean_res
    except Exception as e:
        print(f"Erro na moderação: {e}")
        return False

@router.post("/")
async def post_colaboracao(request: Request, obj_in: ColaboracaoCreate):
    if await is_toxic(obj_in.text):
        raise HTTPException(
            status_code=400, 
            detail="Comentário bloqueado. Por favor, foque sua sugestão no aspecto técnico ou visual do jornal."
        )
    
    db = request.app.state.database
    if db is None:
        raise HTTPException(status_code=500, detail="Banco de dados offline")
    
    crud = CRUDColaboracao(db)
    inserted_id = await crud.create(obj_in)
    return {"message": "Sugestão enviada com sucesso!", "id": inserted_id}

@router.get("/")
async def get_colaboracoes(request: Request):
    db = request.app.state.database
    if db is None:
        return []
    crud = CRUDColaboracao(db)
    return await crud.get_multi()