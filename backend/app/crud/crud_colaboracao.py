from datetime import datetime
from ..models.colaboracao import ColaboracaoCreate

class CRUDColaboracao:
    def __init__(self, db):
        self.collection = db["colaboracoes"]

    async def create(self, obj_in: ColaboracaoCreate):
        doc = obj_in.model_dump()
        doc["date"] = datetime.now().strftime("%d/%m/%Y %H:%M")
        result = await self.collection.insert_one(doc)
        return str(result.inserted_id)

    async def get_multi(self):
        cursor = self.collection.find().sort("_id", -1).limit(50)
        colabs = []
        async for doc in cursor:
            doc["_id"] = str(doc["_id"])
            colabs.append(doc)
        return colabs