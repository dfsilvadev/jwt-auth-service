import { ZodError } from "zod";

import {
  AccountAlreadyExistsError,
  InvalidCredentialsError
} from "../../../domain/errors";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS
} from "./constants/error-messages";
import { InvalidTokenError } from "./invalid-token.error";
import { UnauthorizedError } from "./unauthorized.error";

import type { HttpResponse } from "../types/http.types";

/**
 * Maps domain errors and validation errors to HTTP responses
 */
export function toHttpResponse(error: unknown): HttpResponse {
  // Zod validation errors
  if (error instanceof ZodError) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      body: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: ERROR_MESSAGES.VALIDATION_ERROR,
        details: error.issues
      }
    };
  }

  // Domain errors
  if (error instanceof InvalidCredentialsError) {
    return {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      body: {
        code: ERROR_CODES.INVALID_CREDENTIALS,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        details: null
      }
    };
  }

  if (error instanceof AccountAlreadyExistsError) {
    return {
      statusCode: HTTP_STATUS.CONFLICT,
      body: {
        code: ERROR_CODES.ACCOUNT_EXISTS,
        message: ERROR_MESSAGES.ACCOUNT_EXISTS,
        details: error.details ?? null
      }
    };
  }

  // HTTP errors
  if (
    error instanceof InvalidTokenError ||
    error instanceof UnauthorizedError
  ) {
    return {
      statusCode: error.statusCode,
      body: {
        code: error.code,
        message: error.message,
        details: error.details ?? null
      }
    };
  }

  // Unknown errors - log for debugging
  if (error instanceof Error) {
    // eslint-disable-next-line no-console
    console.error("[HTTP Error Mapper] Unknown error:", error);
  }

  return {
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    body: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      details: null
    }
  };
}
