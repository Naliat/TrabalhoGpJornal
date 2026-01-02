from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from bson.objectid import ObjectId
from fastapi import HTTPException, status
from datetime import datetime, timezone

from ..models.noticia import NoticiaCreate, NoticiaResponse as Noticia

COLLECTION_NAME = "NOTICIA"

class CRUDNoticia: 
    
    def __init__(self, db: Optional[AsyncIOMotorDatabase]):
        self.db = db
        self.collection = None
        if self.db is not None:
            self.collection = self.db[COLLECTION_NAME]

    def is_db_active(self):
        if self.collection is None:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE, 
                detail="Conexão com o banco de dados não está ativa."
            )
        return True
        
    async def create_noticia(self, noticia_in: NoticiaCreate, autor_id: str) -> Noticia:
        self.is_db_active() 
        
        noticia_dict = noticia_in.model_dump()
        noticia_dict["autor_id"] = autor_id
        noticia_dict["data_publicacao"] = datetime.now(timezone.utc)
        
        if "imagem_url" not in noticia_dict:
            noticia_dict["imagem_url"] = None

        result = await self.collection.insert_one(noticia_dict)
        
        noticia_dict["id"] = str(result.inserted_id)
        return Noticia(**noticia_dict)

    async def get_noticia(self, noticia_id: str) -> Optional[Noticia]:
        self.is_db_active()
        try:
            object_id = ObjectId(noticia_id)
        except:
            return None

        document = await self.collection.find_one({"_id": object_id})
        if document:
            document["id"] = str(document["_id"])
            return Noticia(**document)
        return None

   
    async def get_all_noticias(self, skip: int = 0, limit: int = 20, categoria: Optional[str] = None) -> List[Noticia]:
        self.is_db_active()
        
      
        filtro = {}
        if categoria:
            filtro["categoria"] = categoria

        noticias_cursor = self.collection.find(filtro).sort("data_publicacao", -1).skip(skip).limit(limit)
        lista_noticias = []
        
        async for noticia in noticias_cursor:
            noticia["id"] = str(noticia["_id"])
            lista_noticias.append(Noticia(**noticia))
            
        return lista_noticias

    async def update_noticia(self, noticia_id: str, update_data: dict, autor_id: str) -> Optional[Noticia]:
        self.is_db_active()
        try:
            object_id = ObjectId(noticia_id)
        except:
            return None

        result = await self.collection.update_one(
            {"_id": object_id, "autor_id": autor_id},
            {"$set": update_data}
        )

        if result.modified_count == 1:
            updated = await self.collection.find_one({"_id": object_id})
            updated["id"] = str(updated["_id"])
            return updated
        return None

    async def delete_noticia(self, noticia_id: str, autor_id: str) -> bool:
        self.is_db_active()
        try:
            object_id = ObjectId(noticia_id)
        except:
            return False

        result = await self.collection.delete_one({"_id": object_id, "autor_id": autor_id})
        return result.deleted_count == 1