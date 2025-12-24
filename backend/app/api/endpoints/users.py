# from fastapi import APIRouter, Request, HTTPException, status, Depends
# from fastapi.security import OAuth2PasswordRequestForm 
# from passlib.context import CryptContext
# from typing import Dict, Optional, Any, List

# #ajustar depois-
# from backend.app.crud.crud_users import CRUDUser 

# router = APIRouter(
#     prefix="/users",
#     tags=["Usuários & Autenticação"]
# )

# pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# def get_user_crud(request: Request) -> CRUDUser:
#     return CRUDUser(db=request.app.state.database)

# def get_password_hash(password):
#     password_str = str(password) 
#     truncated_password = password_str.encode('utf-8')[:72] 
#     return pwd_context.hash(truncated_password)

# def verify_password(plain_password, hashed_password):
#     plain_password_str = str(plain_password)
#     truncated_password = plain_password_str.encode('utf-8')[:72]
#     return pwd_context.verify(truncated_password, hashed_password)

# def is_valid_ufc_email(email: str) -> bool:
#     allowed_domains = ["@gmail.com", "@alu.ufc.br", "@ufc.br"]
#     lower_email = email.lower()
    
#     if any(lower_email.endswith(domain) for domain in allowed_domains):
#         if lower_email.count('@') == 1:
#             return True
    
#     return False

# @router.get("/", response_model=List[Dict[str, Any]])
# async def list_all_users(user_crud: CRUDUser = Depends(get_user_crud)):
#     try:
#         return await user_crud.get_all_users()
#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro: {e}")

# @router.get("/{user_id}", response_model=Dict[str, Any])
# async def get_user(user_id: str, user_crud: CRUDUser = Depends(get_user_crud)):
#     try:
#         user = await user_crud.get_user_by_id(user_id)
#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro: {e}")

#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado.")
#     return user

# @router.post("/register", status_code=status.HTTP_201_CREATED)
# async def register_user(form: OAuth2PasswordRequestForm = Depends(), user_crud: CRUDUser = Depends(get_user_crud)):
#     username = form.username
    
#     if not is_valid_ufc_email(username):
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="O registro requer um endereço de e-mail válido com um dos seguintes domínios: @gmail.com, @alu.ufc.br ou @ufc.br."
#         )
    
#     user_data = {
#         "username": username,
#         "hashed_password": get_password_hash(form.password) 
#     }
    
#     try:
#         new_user = await user_crud.create_user(user_data)
#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro: {e}")
    
#     if new_user is None:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome de usuário já registrado.")
    
#     return {"message": "Usuário registrado com sucesso!", "username": new_user['username']}

# @router.put("/{user_id}", response_model=Dict[str, Any])
# async def update_user(user_id: str, update_data: Dict[str, Any], user_crud: CRUDUser = Depends(get_user_crud)):
#     try:
#         updated_user = await user_crud.update_user(user_id, update_data)
#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro: {e}")

#     if not updated_user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado ou ID inválido.")
#     return updated_user

# @router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
# async def delete_user(user_id: str, user_crud: CRUDUser = Depends(get_user_crud)):
#     try:
#         deleted = await user_crud.delete_user(user_id)
#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro: {e}")

#     if not deleted:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado ou ID inválido.")
#     return {}

# @router.post("/login", response_model=Dict[str, str])
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), user_crud: CRUDUser = Depends(get_user_crud)):
#     username = form_data.username
    
#     try:
#         user = await user_crud.get_user_by_username(username)
#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro: {e}")

#     if not user or not verify_password(form_data.password, user["hashed_password"]): 
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais incorretas.")

#     return {"message": "Login bem-sucedido!", "username": username}