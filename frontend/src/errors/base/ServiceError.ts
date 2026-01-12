export abstract class ServiceError extends Error {
  readonly status: number;
  readonly service: string;

  protected constructor(
    message: string,
    status: number,
    service: string
  ) {
    super(message);
    this.name = "ServiceError";
    this.status = status;
    this.service = service;
  }
}
