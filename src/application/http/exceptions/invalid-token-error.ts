import { AppError } from "./app-error";

import { ERROR_CODES, HTTP_STATUS } from "./constants/error-messages";

export class InvalidTokenError extends AppError {
  constructor(message = "Invalid access token", details?: unknown) {
    super(
      message,
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.INVALID_TOKEN,
      details,
      true
    );
  }
}
