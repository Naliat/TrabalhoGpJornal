import logging
import time
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from starlette.middleware.base import BaseHTTPMiddleware
from .core.config import settings
from .api.endpoints import noticias, users, auth, editais

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🔌 Iniciando servidor e preparando recursos...")
    
    app.state.mongodb_client = None
    app.state.database = None
    
    if settings.MONGO_DB_URL and settings.MONGO_DB_NAME:
        logger.info("⏳ Tentando conectar ao MongoDB Atlas...")
        
        try:
            mongodb_client = AsyncIOMotorClient(settings.MONGO_DB_URL)
            app.state.mongodb_client = mongodb_client
            
            await app.state.mongodb_client.admin.command('ping')
            
            app.state.database = mongodb_client[settings.MONGO_DB_NAME]
            
            logger.info(f"✅ Conexão com MongoDB Atlas ({settings.MONGO_DB_NAME}) bem-sucedida!")
            
        except Exception as e:
            logger.error(f"❌ Falha fatal ao conectar ao MongoDB Atlas. O erro foi: {e}", exc_info=True)
            app.state.database = None 
            app.state.mongodb_client = None
            
    else:
        logger.warning("⚠️ Variáveis MONGO_DB_URL ou MONGO_DB_NAME não definidas. Conexão com DB pulada.")
    
    yield

    if app.state.mongodb_client:
        app.state.mongodb_client.close()
        logger.info("🔌 Conexão com MongoDB Atlas fechada. Servidor encerrado.")
    else:
        logger.info("🛑 Servidor encerrado.")

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Processa a requisição
        response = await call_next(request)
        
        process_time = time.time() - start_time
        
        # Log detalhado do movimento
        logger.info(
            f"HTTP | {request.client.host}:{request.client.port} "
            f"| {request.method} {request.url.path} "
            f"| Status: {response.status_code} "
            f"| Tempo: {process_time:.4f}s"
        )
        
        return response

def create_app() -> FastAPI:
    application = FastAPI(
        title="API de Jornal (FastAPI + MongoDB Atlas)",
        version="1.0.0",
        description="Backend para gerenciamento de notícias, usuários e editais.",
        lifespan=lifespan,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json" 
    )

    origins = [
        settings.FRONTEND_URL, 
    ]
    application.add_middleware(
        CORSMiddleware,
        allow_origins=origins,              
        allow_credentials=True,
        allow_methods=["*"],                
        allow_headers=["*"],                
    )

    # Adiciona o Middleware de Logging ANTES das rotas serem acessadas
    application.add_middleware(LoggingMiddleware)

    application.include_router(noticias.router, tags=["Notícias"])  
    application.include_router(users.router, tags=["Usuários"])     
    application.include_router(auth.router, tags=["Autenticação"])
    application.include_router(editais.router, tags=["Editais"])
    
    return application

app = create_app()

@app.get("/", tags=["Status"])
async def read_root(request: Request):
    """
    Retorna uma mensagem de status da API e o estado da conexão com o banco de dados.
    """
    db_obj = getattr(request.app.state, 'database', None)
    db_status = "Conectado" if db_obj is not None else "Desconectado/Falhou"
    
    return {
        "message": "API de Jornal rodando!", 
        "database_status": db_status,
        "docs_url": f"{request.url.scheme}://{request.url.netloc}/docs",
        "redoc_url": f"{request.url.scheme}://{request.url.netloc}/redoc",
    }