/**
 * Centralized error codes and messages for the application.
 * This file contains all error codes, HTTP status codes, and default messages.
 *
 * HTTP Status Code Semantics:
 * - 400 (Bad Request): Invalid input/validation errors
 * - 401 (Unauthorized): Authentication required/failed - user is not authenticated
 * - 403 (Forbidden): Authorization failed - user is authenticated but lacks permission
 * - 404 (Not Found): Resource does not exist
 * - 409 (Conflict): Resource already exists or state conflict
 * - 410 (Gone): Resource permanently deleted
 * - 500 (Internal Server Error): Unexpected server error
 */

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  GONE: 410,
  INTERNAL_SERVER_ERROR: 500
} as const;

export const ERROR_CODES = {
  // Validation (400)
  VALIDATION_ERROR: "VALIDATION_ERROR",

  // Authentication (401) - Not authenticated
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_TOKEN: "INVALID_TOKEN",
  INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",
  UNAUTHORIZED: "UNAUTHORIZED",

  // Authorization (403) - Authenticated but not authorized
  FORBIDDEN: "FORBIDDEN",

  // Account Status (403, 410)
  ACCOUNT_PENDING: "ACCOUNT_PENDING",
  ACCOUNT_SUSPENDED: "ACCOUNT_SUSPENDED",
  ACCOUNT_DELETED: "ACCOUNT_DELETED",

  // Organization Status (403, 404)
  ORGANIZATION_NOT_ACTIVE: "ORGANIZATION_NOT_ACTIVE",
  ORGANIZATION_NOT_FOUND: "ORGANIZATION_NOT_FOUND",

  // Conflicts (409)
  ACCOUNT_EXISTS: "ACCOUNT_EXISTS",
  ORGANIZATION_EXISTS: "ORGANIZATION_EXISTS",

  // Generic (500)
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR"
} as const;

export const ERROR_MESSAGES = {
  // Validation (400)
  VALIDATION_ERROR:
    "We couldn't process your request due to invalid data. Please check your information and try again",

  // Authentication (401) - Not authenticated
  INVALID_CREDENTIALS:
    "The email or password you entered is incorrect. Please try again",
  AUTHENTICATION_REQUIRED: "Please log in to access this resource",
  AUTHENTICATION_TOKEN_REQUIRED:
    "Authentication token is missing. Please log in again",
  UNAUTHORIZED:
    "Access denied. Please ensure you're logged in with the correct account",

  // Token Errors (401)
  INVALID_TOKEN: "Your session has expired or is invalid. Please log in again",
  INVALID_TOKEN_FORMAT: "Authentication format is invalid. Please log in again",
  INVALID_TOKEN_PAYLOAD:
    "Your session information is incomplete. Please log in again",
  INVALID_TOKEN_ROLE:
    "Your account role is invalid. Please contact support for assistance",
  INVALID_REFRESH_TOKEN:
    "Your session refresh token is invalid or has expired. Please sign in again",

  // Authorization (403) - Authenticated but not authorized
  FORBIDDEN:
    "You don't have permission to access this resource. Please contact your administrator",

  // Account Status (403, 410)
  ACCOUNT_PENDING:
    "Your account is awaiting email verification. Please check your inbox and verify your email address",
  ACCOUNT_SUSPENDED:
    "Your account has been suspended. Please contact our support team for assistance",
  ACCOUNT_DELETED:
    "This account is no longer available. If you believe this is an error, please contact support",

  // Organization Status (403, 404)
  ORGANIZATION_NOT_ACTIVE:
    "This organization is currently inactive. Please contact your administrator",
  ORGANIZATION_NOT_FOUND:
    "The requested organization could not be found. Please verify the information and try again",

  // Conflicts (409)
  ACCOUNT_EXISTS:
    "An account with this email address already exists. Please use a different email or try logging in",
  ORGANIZATION_EXISTS:
    "An organization with this document number already exists. Please verify your information",

  // Generic (500)
  INTERNAL_SERVER_ERROR:
    "Something went wrong on our end. Please try again later or contact support if the problem persists"
} as const;

/**
 * Helper type to ensure type-safety when using error codes
 */
export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

/**
 * Helper type to ensure type-safety when using error messages
 */
export type ErrorMessage = (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
