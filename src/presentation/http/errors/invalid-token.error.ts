import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS
} from "./constants/error-messages";
import { HttpError } from "./http-error";

export class InvalidTokenError extends HttpError {
  constructor(message: string = ERROR_MESSAGES.INVALID_TOKEN) {
    super(message, HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.INVALID_TOKEN);
  }
}
