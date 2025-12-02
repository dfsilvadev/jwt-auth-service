import { AppError } from "./app-error";

import { ERROR_CODES, HTTP_STATUS } from "./constants/error-messages";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", details?: unknown) {
    super(
      message,
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.UNAUTHORIZED,
      details,
      true
    );
  }
}
