from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from typing import List, Optional
from datetime import datetime, timezone
from ..schemas.edital import EditalCreate 

def _format_doc(doc: Optional[dict]) -> Optional[dict]:
    if doc:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
    return doc

async def get_edital_by_id(db: AsyncIOMotorDatabase, id: str) -> Optional[dict]:
    try:
        oid = ObjectId(id)
    except:
        return None
    edital_doc = await db.editais.find_one({"_id": oid})
    return _format_doc(edital_doc)

async def create_edital(db: AsyncIOMotorDatabase, edital_in: EditalCreate, professor_id: str, professor_username: str) -> dict:
    edital_data = edital_in.model_dump()
    edital_data["professor_id"] = professor_id
    edital_data["professor_username"] = professor_username 
    edital_data["created_at"] = datetime.now(timezone.utc)
    result = await db.editais.insert_one(edital_data)
    return await get_edital_by_id(db, str(result.inserted_id))

async def get_multi_editais(
    db: AsyncIOMotorDatabase, 
    skip: int = 0, 
    limit: int = 100, 
    apenas_validos: bool = True,
    search: Optional[str] = None
) -> List[dict]:
    query = {}
    if apenas_validos:
        query["data_fim"] = {"$gte": datetime.now(timezone.utc)}
        
    if search:
        query["title"] = {"$regex": search, "$options": "i"}
    
    editais_cursor = db.editais.find(query).sort("created_at", -1).skip(skip).limit(limit) 
    
    editais_list = []
    async for doc in editais_cursor:
        editais_list.append(_format_doc(doc))
        
    return editais_list

async def update_edital(db: AsyncIOMotorDatabase, id: str, edital_update: dict) -> Optional[dict]:
    try:
        oid = ObjectId(id)
    except:
        return None
    edital_update.pop("_id", None)
    result = await db.editais.update_one({"_id": oid}, {"$set": edital_update})
    if result.modified_count == 1 or result.matched_count == 1:
        return await get_edital_by_id(db, id)
    return None

async def delete_edital(db: AsyncIOMotorDatabase, id: str) -> bool:
    try:
        oid = ObjectId(id)
    except:
        return False
    result = await db.editais.delete_one({"_id": oid})
    return result.deleted_count == 1