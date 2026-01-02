import type { UserResponseDTO } from "../../types/user/dto/UserResponseDTO";

export interface AuthContextType {
  token: string | null;
  user: UserResponseDTO | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}