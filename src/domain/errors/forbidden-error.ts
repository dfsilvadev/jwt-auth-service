import { ERROR_CODES } from "../../presentation/http/errors/constants/error-messages";
import { HTTP_STATUS } from "../../shared/constants/http-status";

import { AppError } from "./app-error";

export class ForbiddenError extends AppError {
  constructor(message = "Access Denied", details?: unknown) {
    super(message, HTTP_STATUS.FORBIDDEN, ERROR_CODES.FORBIDDEN, details, true);
  }
}
