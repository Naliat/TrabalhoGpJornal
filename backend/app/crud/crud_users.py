# Arquivo: backend/app/crud/crud_users.py

from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Optional, Dict, Any, List
from bson.objectid import ObjectId
from fastapi import HTTPException, status
from passlib.context import CryptContext

COLLECTION_NAME = "users"
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

class CRUDUser: 
    
    def __init__(self, db: Optional[AsyncIOMotorDatabase]):
        self.db = db
        self.collection = None
        if self.db is not None:
            self.collection = self.db[COLLECTION_NAME]

    def is_db_active(self):
        if self.collection is None:
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, 
                detail="Conexão com o banco de dados não está ativa.")
        return True
        
    async def create_user(self, user_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        self.is_db_active() 
        
        if await self.collection.find_one({"username": user_data["username"]}):
            return None
        
        result = await self.collection.insert_one(user_data)
        user_data["_id"] = str(result.inserted_id)
        user_data.pop("hashed_password", None)
        return user_data

    async def get_user_by_username(self, username: str) -> Optional[Dict[str, Any]]:
        self.is_db_active()
        document = await self.collection.find_one({"username": username})
        if document:
            document["_id"] = str(document["_id"])
            return document
        return None

    async def get_user_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        self.is_db_active()
        try:
            object_id = ObjectId(user_id)
        except:
            return None 

        document = await self.collection.find_one({"_id": object_id}, {"hashed_password": 0})
        if document:
            document["_id"] = str(document["_id"])
            return document
        return None

    # READ (Listar Todos)
    async def get_all_users(self) -> List[Dict[str, Any]]:
        self.is_db_active()
        users_cursor = self.collection.find({}, {"hashed_password": 0}) 
        lista_usuarios = []
        async for user in users_cursor:
            user["_id"] = str(user["_id"])
            lista_usuarios.append(user)
        return lista_usuarios
    
    # UPDATE
    async def update_user(self, user_id: str, update_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        self.is_db_active()
        try:
            object_id = ObjectId(user_id)
        except:
            return None

        if "password" in update_data:
            update_data["hashed_password"] = pwd_context.hash(update_data.pop("password"))
        
        result = await self.collection.update_one(
            {"_id": object_id},
            {"$set": update_data}
        )

        if result.modified_count == 1:
            return await self.get_user_by_id(user_id)
        return None

    async def delete_user(self, user_id: str) -> bool:
        self.is_db_active()
        try:
            object_id = ObjectId(user_id)
        except:
            return False

        result = await self.collection.delete_one({"_id": object_id})
        
        return result.deleted_count == 1