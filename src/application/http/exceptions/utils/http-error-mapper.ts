import { ZodError } from "zod";

import { AppError } from "../app-error";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS
} from "../constants/error-messages";

import type { HttpResponse } from "../../../../domain/entities/httpProtocol.interface";

export function toHttpResponse(error: unknown): HttpResponse {
  if (error instanceof ZodError) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      body: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: ERROR_MESSAGES.VALIDATION_ERROR,
        issues: error.issues
      }
    };
  }

  if (error instanceof AppError) {
    return {
      statusCode: error.status,
      body: {
        code: error.code,
        message: error.expose
          ? error.message
          : ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        details: error.details ?? null
      }
    };
  }

  return {
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    body: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR
    }
  };
}
