from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import EmailStr, BaseModel
from datetime import datetime, timezone
from .auth import get_db
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter(prefix="/newsletter", tags=["Newsletter"])

class NewsletterSchema(BaseModel):
    email: EmailStr

@router.post("/subscribe", status_code=status.HTTP_201_CREATED)
async def subscribe_newsletter(data: NewsletterSchema, db: AsyncIOMotorDatabase = Depends(get_db)):
    newsletter_collection = db["NEWSLETTER"]
    await newsletter_collection.update_one(
        {"email": data.email},
        {"$set": {
            "email": data.email,
            "ativo": True,
            "data_inscricao": datetime.now(timezone.utc) 
        }},
        upsert=True
    )
    return {"message": "Inscrição realizada com sucesso!"}