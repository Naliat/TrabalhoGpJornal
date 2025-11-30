from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from .core.config import settings
from .api.endpoints import noticias
from .api.endpoints import users
from .api.endpoints import auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Função de gerenciamento do ciclo de vida (startup/shutdown) do aplicativo.
    Responsável por conectar e desconectar o MongoDB.
    """
    print("🔌 Iniciando servidor...")
    app.state.mongodb_client = None
    app.state.database = None
    
    if settings.MONGO_DB_URL and settings.MONGO_DB_NAME:
        print("🔌 Tentando conectar ao MongoDB Atlas...")
        
        try:
            mongodb_client = AsyncIOMotorClient(settings.MONGO_DB_URL)
            app.state.mongodb_client = mongodb_client
            
            await app.state.mongodb_client.admin.command('ping')
            
            app.state.database = mongodb_client[settings.MONGO_DB_NAME]
            
            print(f"✅ Conexão com MongoDB Atlas ({settings.MONGO_DB_NAME}) bem-sucedida!")
            
        except Exception as e:
            print(f"❌ Falha fatal ao conectar ao MongoDB Atlas. O erro original foi: {e}")
            app.state.database = None 
            app.state.mongodb_client = None
            
    else:
        print("⚠️ Variáveis MONGO_DB_URL ou MONGO_DB_NAME não definidas. Conexão com DB pulada.")
    
    yield 

    if app.state.mongodb_client:
        app.state.mongodb_client.close()
        print("🔌 Conexão com MongoDB Atlas fechada.")

app = FastAPI(
    title="API de Jornal (FastAPI + MongoDB Atlas)",
    version="1.0.0",
    description="Backend para gerenciamento de notícias e usuários.",
    lifespan=lifespan 
)

origins = [
    settings.FRONTEND_URL, 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,              
    allow_credentials=True,
    allow_methods=["*"],                
    allow_headers=["*"],                
)

app.include_router(noticias.router)  
app.include_router(users.router)     
app.include_router(auth.router)      

@app.get("/", tags=["Status"])
async def read_root():
    """Retorna uma mensagem de status e a localização da documentação."""
    
    db_obj = getattr(app.state, 'database', None)
    db_status = "Conectado" if db_obj is not None else "Desconectado/Falhou"
    
    return {
        "message": "API rodando!", 
        "database_status": db_status,
        "docs_url": "/docs"
    }