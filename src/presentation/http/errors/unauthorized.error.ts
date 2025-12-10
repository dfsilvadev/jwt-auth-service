import { AppError } from "../../../domain/errors/app-error";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS
} from "./constants/error-messages";

export class UnauthorizedError extends AppError {
  constructor(message: string = ERROR_MESSAGES.AUTHENTICATION_REQUIRED) {
    super(message, HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED);
  }
}
