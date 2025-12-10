import { ZodError } from "zod";

import { AppError } from "../../../domain/errors/app-error";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS
} from "./constants/error-messages";

import type { HttpResponse } from "../types/http.types";

/**
 * Maps application errors and validation errors to HTTP responses
 *
 * This mapper automatically handles:
 * - Zod validation errors → 400 BAD_REQUEST
 * - AppError (all custom errors) → Uses error.status, error.code, error.message
 * - Unknown errors → 500 INTERNAL_SERVER_ERROR
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

  // AppError - all custom errors (domain and HTTP)
  // All custom errors have status, code, message, and details
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
