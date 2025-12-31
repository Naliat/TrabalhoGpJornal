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
        
        # # Verifica se já existe e-mail
        # existing_user = await self.collection.find_one(
        #     {"email": user_in.email}
        # )
        # if existing_user:
        #     raise HTTPException(
        #         status_code=status.HTTP_400_BAD_REQUEST,
        #         detail="E-mail já cadastrado"
        #     )
    
        # user_dict = user_in.model_dump()
        # user_dict["data_criacao"] = datetime.now(timezone.utc)
        
        # result = await self.collection.insert_one(user_dict)
        
        # user_dict["id"] = str(result.inserted_id)
        # return UserResponse(**user_dict)
        try:
            if await self.collection.find_one({"email": user_in.email}):
                raise HTTPException(
                    status_code=400,
                    detail="E-mail já cadastrado"
                )
            user_dict = user_in.model_dump()
            user_dict["data_criacao"] = datetime.now(timezone.utc)

            result = await self.collection.insert_one(user_dict)

            user_dict["id"] = str(result.inserted_id)
            return UserResponse(**user_dict)

        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Erro ao criar usuário: {str(e)}"
     )

    async def get_user_by_id(self, user_id: str) -> Optional[UserResponse]:
        self.is_db_active()
        try:
            object_id = ObjectId(user_id)
        except Exception:
            raise HTTPException(
                status_code=400,
                detail="ID de usuário inválido"
            )

        user = await self.collection.find_one({"_id": object_id})
        if not user:
            raise HTTPException(
                status_code=404,
                detail="Usuário não encontrado"
            )
        
        user["id"] = str(user["_id"])
        return self._normalize_user(user)
        

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
        except Exception:
            raise HTTPException(400, "ID inválido")

        update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
        
        if "email" in update_dict:
            existing = await self.collection.find_one({
            "email": update_dict["email"],
            "_id": {"$ne": object_id}
            })
            if existing:
                raise HTTPException(400, "E-mail já cadastrado")

        result = await self.collection.update_one(
            {"_id": object_id},
            {"$set": update_dict}
        )
        if result.matched_count == 0:
            raise HTTPException(404, "Usuário não encontrado")
        
        updated = await self.collection.find_one({"_id": object_id})
        updated["id"] = str(updated["_id"])

        return self._normalize_user(updated)

    async def delete_user(self, user_id: str) -> bool:
        self.is_db_active()
        try:
            object_id = ObjectId(user_id)
        except Exception:
            raise HTTPException(400, "ID inválido")

        result = await self.collection.delete_one({"_id": object_id})

        if result.deleted_count == 0:
            raise HTTPException(404, "Usuário não encontrado")
        return result.deleted_count > 0
