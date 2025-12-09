import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS
} from "./constants/error-messages";
import { HttpError } from "./http-error";

export class UnauthorizedError extends HttpError {
  constructor(message: string = ERROR_MESSAGES.AUTHENTICATION_REQUIRED) {
    super(message, HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED);
  }
}
