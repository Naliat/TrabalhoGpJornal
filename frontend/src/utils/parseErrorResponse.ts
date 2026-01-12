import type { ServiceError } from "../errors/base/ServiceError";

export async function parseErrorResponse<E extends ServiceError>(
  response: Response,
  ErrorClass: new (message: string, status: number) => E
): Promise<never> {
  let message = "Unknown error.";

  try {
    const data = await response.json();

    if (data?.message) {
      message = data.message;
    } else if (Array.isArray(data?.errors) && data.errors.length > 0) {
      message = data.errors[0];
    } else {
      message = response.statusText || message;
    }
  } catch {
    message = response.statusText || message;
  }

  throw new ErrorClass(message, response.status);
}
