import { ServiceError } from "../base/ServiceError";

export class AuthContextError extends ServiceError {
    constructor(
        message = "useAuth deve ser usado dentro de AuthProvider"
    ) {
        super(message, 500, "authContext");
        this.name = "AuthContextError";
    }
}
