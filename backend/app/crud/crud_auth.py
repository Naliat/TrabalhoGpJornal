from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timedelta, timezone

async def store_reset_token(db: AsyncIOMotorDatabase, email: str, token: str):
    expires = datetime.now(timezone.utc) + timedelta(minutes=15)
    return await db.USUARIO.update_one(
        {"email": email},
        {"$set": {
            "reset_token": token,
            "reset_token_expires": expires
        }}
    )

async def get_user_by_reset_token(db: AsyncIOMotorDatabase, token: str):
    return await db.USUARIO.find_one({
        "reset_token": token,
        "reset_token_expires": {"$gt": datetime.now(timezone.utc)}
    })

async def update_user_password(db: AsyncIOMotorDatabase, user_id: str, hashed_password: str):
    return await db.USUARIO.update_one(
        {"_id": user_id},
        {
            "$set": {"password": hashed_password},
            "$unset": {"reset_token": "", "reset_token_expires": ""}
        }
    )