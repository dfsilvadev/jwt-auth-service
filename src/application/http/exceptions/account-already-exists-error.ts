import { AppError } from "./app-error";

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS
} from "./constants/error-messages";

export class AccountAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(
      ERROR_MESSAGES.ACCOUNT_EXISTS,
      HTTP_STATUS.CONFLICT,
      ERROR_CODES.ACCOUNT_EXISTS,
      { email },
      true
    );
  }
}
