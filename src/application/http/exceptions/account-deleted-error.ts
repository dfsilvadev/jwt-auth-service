import { AppError } from "./app-error";

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS
} from "./constants/error-messages";

export class AccountDeletedError extends AppError {
  constructor() {
    super(
      ERROR_MESSAGES.ACCOUNT_DELETED,
      HTTP_STATUS.GONE,
      ERROR_CODES.ACCOUNT_DELETED
    );
  }
}
