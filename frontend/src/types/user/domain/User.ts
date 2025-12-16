import type { UserType } from "../../enums/UserTypeEnum";

export interface User {
    id: string;
    username: string;
    email: string;
    userType: UserType;
}