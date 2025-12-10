import { AppError } from "../../../domain/errors/app-error";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS
} from "./constants/error-messages";

export class InvalidTokenError extends AppError {
  constructor(message: string = ERROR_MESSAGES.INVALID_TOKEN) {
    super(message, HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.INVALID_TOKEN);
  }
}
