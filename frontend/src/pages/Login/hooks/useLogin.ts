import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/service/auth/loginUser";
import { LoginServiceError } from "../../../errors/auth/LoginServiceError";
import { useAuth } from "../../../auth/hooks/useAuth";

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth()

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(email: string, password: string): Promise<void> {
    setErrorMessage("");

    try {
      setIsLoading(true);

      const token = await loginUser(email, password);
      login(token.access_token);

      navigate("/home");
    } catch (error: unknown) {
      if (error instanceof LoginServiceError) {
        setErrorMessage("Não foi possível realizar o login.");
        return;
      }

      setErrorMessage("Erro inesperado ao realizar o login.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    handleLogin,
    isLoading,
    errorMessage,
  };
}
