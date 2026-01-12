import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthContextError } from "../../errors/auth/AuthContextError";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new AuthContextError();
  }

  return context;
}