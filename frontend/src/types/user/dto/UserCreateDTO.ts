import type { UserType } from "../../enums/UserTypeEnum";

export interface UserCreateDTO {
    username: string;
    email: string;
    password: string;
    user_type: UserType;
}