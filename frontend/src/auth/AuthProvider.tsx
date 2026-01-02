import { useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import type { AuthContextType } from "./types/AuthContextType";
import type { UserResponseDTO } from "../types/user/dto/UserResponseDTO";
import { getUserByToken } from "../api/service/user/getUserByToken";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function login(token: string) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userData = await getUserByToken(token);
        setUser(userData);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [token]);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  const value: AuthContextType = {
    token,
    user,
    loading,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}