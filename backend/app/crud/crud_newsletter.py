from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timezone

async def subscribe_newsletter(db: AsyncIOMotorDatabase, email: str):
    newsletter_data = {
        "email": email,
        "ativo": True,
        "data_inscricao": datetime.now(timezone.utc)
    }
    await db.newsletter.update_one(
        {"email": email}, 
        {"$set": newsletter_data}, 
        upsert=True
    )
    return {"message": "Inscrição realizada com sucesso"}