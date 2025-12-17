import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/service/auth/loginUser";
import { LoginServiceError } from "../../../errors/auth/LoginServiceError";

export function useLogin() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(email: string, password: string) {
    setErrorMessage("");

    try {
      setIsLoading(true);

      const token = await loginUser(email, password);

      localStorage.setItem("access_token", token.access_token);

      navigate("/home");
    } catch (error: unknown) {
      if (error instanceof LoginServiceError) {
        setErrorMessage(error.message);
        return;
      }

      setErrorMessage("Erro inesperado ao realizar login.");
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
