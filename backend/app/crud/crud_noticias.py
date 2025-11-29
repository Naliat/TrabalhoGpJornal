from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from bson.objectid import ObjectId
from fastapi import HTTPException, status

from backend.app.models.schemas import NoticiaCreate, Noticia

COLLECTION_NAME = "noticias"

class CRUDNoticia: 
    
    def __init__(self, db: Optional[AsyncIOMotorDatabase]):
        self.db = db
        self.collection = None
        if self.db is not None:
            self.collection = self.db[COLLECTION_NAME]

    def is_db_active(self):
        """ Verifica se a conexão com o DB está ativa. """
        if self.collection is None:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE, 
                detail="Conexão com o banco de dados não está ativa. Verifique as credenciais no .env."
            )
        return True
        
    async def create_noticia(self, noticia_in: NoticiaCreate) -> Noticia:
        self.is_db_active() 
        
        noticia_dict = noticia_in.model_dump()
        result = await self.collection.insert_one(noticia_dict)
        
        noticia_dict["_id"] = str(result.inserted_id)
        return Noticia(**noticia_dict)

    async def get_noticia(self, noticia_id: str) -> Optional[Noticia]:
        self.is_db_active()
        
        try:
            object_id = ObjectId(noticia_id)
        except:
            return None

        document = await self.collection.find_one({"_id": object_id})
        
        if document:
            document["_id"] = str(document["_id"])
            return Noticia(**document)
        return None

    async def get_all_noticias(self) -> List[Noticia]:
        self.is_db_active()
        
        noticias_cursor = self.collection.find()
        lista_noticias = []
        
        async for noticia in noticias_cursor:
            noticia["_id"] = str(noticia["_id"])
            lista_noticias.append(Noticia(**noticia))
            
        return lista_noticias

    async def update_noticia(self, noticia_id: str, update_data: dict) -> Optional[Noticia]:
        self.is_db_active()

        try:
            object_id = ObjectId(noticia_id)
        except:
            return None

        result = await self.collection.update_one(
            {"_id": object_id},
            {"$set": update_data}
        )

        if result.modified_count == 1:
            updated = await self.collection.find_one({"_id": object_id})
            updated["_id"] = str(updated["_id"])
            return Noticia(**updated)

        return None

    async def delete_noticia(self, noticia_id: str) -> bool:
        self.is_db_active()

        try:
            object_id = ObjectId(noticia_id)
        except:
            return False

        result = await self.collection.delete_one({"_id": object_id})
        return result.deleted_count == 1
