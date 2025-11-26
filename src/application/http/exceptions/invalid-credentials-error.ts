import { AppError } from "./app-error";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS
} from "./constants/error-messages";

export class InvalidCredentialsError extends AppError {
  constructor() {
    super(
      ERROR_MESSAGES.INVALID_CREDENTIALS,
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.INVALID_CREDENTIALS,
      null,
      true
    );
  }
}
