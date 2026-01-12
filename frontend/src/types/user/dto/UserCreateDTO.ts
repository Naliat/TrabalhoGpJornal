import type { UserType } from "../../enums/UserTypeEnum";

export interface UserCreateDTO {
    firstName: string;
    secondName: string;
    email: string;
    password: string;
    user_type: UserType;
}