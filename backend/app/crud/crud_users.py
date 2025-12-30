from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from fastapi import HTTPException, status
from typing import Optional, List
from datetime import datetime, timezone
from ..models.user import UserCreate, UserResponse, UserUpdate


class CRUDUser:

    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db.USUARIO

    def is_db_active(self):
        if self.collection is None:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE, 
                detail="Conexão com o banco de dados não está ativa."
            )
        return True
    
    def _normalize_user(self, user: dict) -> dict:
        user["id"] = str(user["_id"])
        user.pop("_id", None)

        # Compatibilidade com dados antigos
        if "user_type" not in user and "papel" in user:
            user["user_type"] = user.pop("papel")

        return user
    
    async def create_user(self, user_in: UserCreate) -> UserResponse:
        self.is_db_active()
        
        user_dict = user_in.model_dump()
        user_dict["data_criacao"] = datetime.now(timezone.utc)
        
        result = await self.collection.insert_one(user_dict)
        
        user_dict["id"] = str(result.inserted_id)
        return UserResponse(**user_dict)

    async def get_user_by_id(self, user_id: str) -> Optional[UserResponse]:
        self.is_db_active()
        try:
            object_id = ObjectId(user_id)
        except:
            return None

        user = await self.collection.find_one({"_id": object_id})
        if user:
            user["id"] = str(user["_id"])
            return self._normalize_user(user)
        return None

    async def get_all_users(self, skip: int = 0, limit: int = 20) -> List[UserResponse]:
        self.is_db_active()
        users_cursor = self.collection.find().skip(skip).limit(limit)
        lista_users = []
        
        async for user in users_cursor:
            user["id"] = str(user["_id"])
            lista_users.append(self._normalize_user(user))
            
        return lista_users

    async def update_user(self, user_id: str, update_data: UserUpdate) -> Optional[UserResponse]:
        self.is_db_active()
        try:
            object_id = ObjectId(user_id)
        except:
            return None

        update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
        
        result = await self.collection.update_one(
            {"_id": object_id},
            {"$set": update_dict}
        )

        if result.modified_count == 1:
            updated = await self.collection.find_one({"_id": object_id})
            updated["id"] = str(updated["_id"])
            return self._normalize_user(updated)
        return None

    async def delete_user(self, user_id: str) -> bool:
        self.is_db_active()
        try:
            object_id = ObjectId(user_id)
        except:
            return False

        result = await self.collection.delete_one({"_id": object_id})
        return {"msg": "usuário removido com sucesso", "deleted": result.deleted_count == 1}
