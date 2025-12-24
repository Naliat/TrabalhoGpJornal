import logging
import time
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from starlette.middleware.base import BaseHTTPMiddleware
from .core.config import settings
from .api.endpoints import noticias, users, auth, editais, newsletter 

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.mongodb_client = None
    app.state.database = None
    
    if settings.MONGO_DB_URL and settings.MONGO_DB_NAME:
        try:
            mongodb_client = AsyncIOMotorClient(settings.MONGO_DB_URL)
            app.state.mongodb_client = mongodb_client
            await app.state.mongodb_client.admin.command('ping')
            app.state.database = mongodb_client[settings.MONGO_DB_NAME]
            logger.info(f"✅ Conexão com MongoDB Atlas ({settings.MONGO_DB_NAME}) bem-sucedida!")
        except Exception as e:
            logger.error(f"❌ Falha fatal ao conectar ao MongoDB Atlas: {e}", exc_info=True)
            app.state.database = None 
            app.state.mongodb_client = None
    
    yield

    if app.state.mongodb_client:
        app.state.mongodb_client.close()

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        logger.info(
            f"HTTP | {request.method} {request.url.path} "
            f"| Status: {response.status_code} | Tempo: {process_time:.4f}s"
        )
        return response

def create_app() -> FastAPI:
    application = FastAPI(
        title="API Jornal UFC Quixadá",
        version="1.0.0",
        description="Backend para gerenciamento de notícias, newsletter, usuários e editais.",
        lifespan=lifespan
    )

    origins = [settings.FRONTEND_URL]
    application.add_middleware(
        CORSMiddleware,
        allow_origins=origins,              
        allow_credentials=True,
        allow_methods=["*"],                
        allow_headers=["*"],                
    )

    application.add_middleware(LoggingMiddleware)

    application.include_router(auth.router, tags=["Autenticação"])
    application.include_router(newsletter.router, tags=["Newsletter"])
    application.include_router(noticias.router, tags=["Notícias"])  
    application.include_router(editais.router, tags=["Editais"])
    
    return application

app = create_app()

@app.get("/", tags=["Status"])
async def read_root(request: Request):
    db_obj = getattr(request.app.state, 'database', None)
    db_status = "Conectado" if db_obj is not None else "Desconectado"
    
    return {
        "message": "API de Jornal UFC rodando!", 
        "database_status": db_status,
        "docs_url": "/docs"
    }