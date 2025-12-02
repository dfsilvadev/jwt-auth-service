import { AppError } from "./app-error";

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS
} from "./constants/error-messages";

export class AccountSuspendedError extends AppError {
  constructor() {
    super(
      ERROR_MESSAGES.ACCOUNT_SUSPENDED,
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCOUNT_SUSPENDED
    );
  }
}
