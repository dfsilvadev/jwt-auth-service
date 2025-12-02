import { AppError } from "./app-error";

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS
} from "./constants/error-messages";

export class AccountPendingError extends AppError {
  constructor() {
    super(
      ERROR_MESSAGES.ACCOUNT_PENDING,
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCOUNT_PENDING
    );
  }
}
