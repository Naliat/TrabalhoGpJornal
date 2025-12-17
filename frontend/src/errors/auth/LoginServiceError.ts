import { ServiceError } from "../base/ServiceError";

export class LoginServiceError extends ServiceError {
    constructor(message: string, status: number) {
        super(message, status, "loginUser");
        this.name = "LoginServiceError";
    }
}