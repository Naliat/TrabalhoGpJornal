import type { UserType } from "../../enums/UserTypeEnum";

export interface UserResponseDTO {
  id: string;
  username: string;
  email: string;
  user_type: UserType;
}
