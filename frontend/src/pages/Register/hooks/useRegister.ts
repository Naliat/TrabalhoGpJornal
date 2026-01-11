import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/service/user/registerUser";
import { toUserCreateDTO } from "../../../mappers/user/toUserCreateDTO";
import { RegisterServiceError } from "../../../errors/user/RegisterServiceError";
import type { UserForm } from "../../../types/user/domain/UserForm";

export function useRegister() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  
  async function handleRegister(user: UserForm | any): Promise<void> {
    setErrorMessage("");

    try {
      setIsLoading(true);

      
      const payload = user.username 
        ? user 
        : toUserCreateDTO(user);

      await registerUser(payload);

      navigate("/login");
    } catch (error: any) {
      
      const detailMessage = error.response?.data?.detail || error.message;

      if (error instanceof RegisterServiceError) {
        setErrorMessage(detailMessage || "Não foi possível realizar o cadastro.");
        return;
      }

      setErrorMessage(detailMessage || "Erro inesperado ao realizar cadastro.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    handleRegister,
    isLoading,
    errorMessage,
  };
}