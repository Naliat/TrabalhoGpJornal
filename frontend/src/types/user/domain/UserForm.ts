import type { UserType } from "../../enums/UserTypeEnum";

export interface UserForm {
    username: string;
    email: string;
    password: string;
    userType: UserType;
}