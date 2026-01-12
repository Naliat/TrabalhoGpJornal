import type { User } from "../../types/user/domain/User";
import type { UserResponseDTO } from "../../types/user/dto/UserResponseDTO";

export const toUserFromDTO = (dto: UserResponseDTO): User => ({
  id: dto.id,
  username: dto.username,
  email: dto.email,
  userType: dto.user_type,
});
