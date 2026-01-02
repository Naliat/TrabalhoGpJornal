import { useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import type { AuthContextType } from "./types/AuthContextType";
import { getUserByToken } from "../api/service/user/getUserByToken";
import { toUserFromDTO } from "../mappers/user/toUserFromDTO";
import type { User } from "../types/user/domain/User";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
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
        const user = toUserFromDTO(userData);
        setUser(user);
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