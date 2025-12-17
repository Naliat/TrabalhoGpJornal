import { ServiceError } from "../base/ServiceError";

export class RegisterServiceError extends ServiceError {
  constructor(message: string, status: number) {
    super(message, status, "registerUser");
    this.name = "RegisterServiceError";
  }
}
