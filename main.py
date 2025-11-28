# Arquivo: backend/app/main.py

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from .core.config import settings
from .api.endpoints import noticias
from .api.endpoints import users # Roteador para Login e Registro

# ==============================================================================
# 1. FUNÇÃO LIFESPAN (Gerencia o ciclo de vida da conexão com o MongoDB)
# ==============================================================================
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Função de inicialização (startup) e encerramento (shutdown) do servidor.
    Tenta conectar ao MongoDB Atlas apenas se as variáveis estiverem definidas.
    """
    print("🔌 Iniciando servidor...")

    # Condição para tentar conectar ao DB
    if settings.MONGO_DB_URL and settings.MONGO_DB_NAME:
        print("🔌 Tentando conectar ao MongoDB Atlas...")
        
        # 3. Inicialização da Conexão com o MongoDB
        mongodb_client = AsyncIOMotorClient(settings.MONGO_DB_URL)
        app.state.mongodb_client = mongodb_client
        app.state.database = mongodb_client[settings.MONGO_DB_NAME]
        
        try:
            # Verifica a conexão enviando um ping de administração
            await app.state.mongodb_client.admin.command('ping')
            print(f"✅ Conexão com MongoDB Atlas ({settings.MONGO_DB_NAME}) bem-sucedida!")
        except Exception as e:
            print(f"❌ Falha ao conectar ao MongoDB Atlas. Verifique a URL e acesso. Erro: {e}")
            # Em ambientes de produção, você pode querer levantar (raise) o erro aqui.
    else:
        print("⚠️ Variáveis MONGO_DB_URL ou MONGO_DB_NAME não definidas no .env. Conexão com DB pulada.")
        # Define os estados como None para não quebrar a aplicação ao tentar acessá-los
        app.state.database = None 
        app.state.mongodb_client = None

    yield # Servidor começa a processar requisições

    # OPERAÇÃO DE SHUTDOWN (Fechamento da Conexão)
    if app.state.mongodb_client:
        app.state.mongodb_client.close()
        print("🔌 Conexão com MongoDB Atlas fechada.")

# ==============================================================================
# 2. Inicialização do FastAPI
# ==============================================================================
app = FastAPI(
    title="API de Jornal (FastAPI + MongoDB Atlas)",
    version="1.0.0",
    description="Backend para gerenciamento de notícias e usuários.",
    lifespan=lifespan # Usa a função lifespan para gerenciar o ciclo de vida
)

# ==============================================================================
# 3. Configuração de CORS (Permite a comunicação com o Frontend)
# ==============================================================================
origins = [
    settings.FRONTEND_URL, 
    # Adicionar outros URLs de ambiente de produção aqui quando necessário
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,              
    allow_credentials=True,
    allow_methods=["*"],                
    allow_headers=["*"],                
)

# ==============================================================================
# 4. Inclusão das Rotas
# ==============================================================================
app.include_router(noticias.router)
app.include_router(users.router) 

# ==============================================================================
# 5. Rota Raiz
# ==============================================================================
@app.get("/", tags=["Status"])
async def read_root():
    """Retorna uma mensagem de status e a localização da documentação."""
    return {"message": "API rodando! Consulte /docs para a documentação interativa."}