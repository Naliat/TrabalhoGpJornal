import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserType } from "../../../types/enums/UserTypeEnum";
import { registerUser } from "../../../api/service/user/registerUser";
import { toUserCreateDTO } from "../../../mappers/user/toUserCreateDTO";
import { RegisterServiceError } from "../../../errors/user/RegisterServiceError";

export function useRegister() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    userType: UserType
  ): Promise<void> {
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    try {
      setIsLoading(true);

      await registerUser(
        toUserCreateDTO({
          username,
          email,
          password,
          userType,
        })
      );

      navigate("/login");
    } catch (error: any) {
      if (error instanceof RegisterServiceError) {
        setErrorMessage(error.message);
        return;
      }

      setErrorMessage("Erro inesperado ao realizar cadastro.");
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
