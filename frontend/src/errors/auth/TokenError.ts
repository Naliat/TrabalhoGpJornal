import { ServiceError } from "../base/ServiceError";

export class TokenError extends ServiceError {
  constructor(message: string, status: number) {
    super(message, status, "token");
    this.name = "TokenError";
  }
}
