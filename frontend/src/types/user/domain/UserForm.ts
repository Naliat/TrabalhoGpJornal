import type { UserType } from "../../enums/UserTypeEnum";

export interface UserForm {
    firstName: string;
    secondName: string;
    email: string;
    password: string;
    userType: UserType;
}