/**
 * Centralized error codes and messages for HTTP layer
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
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_TOKEN: "INVALID_TOKEN",
  INVALID_TOKEN_FORMAT: "INVALID_TOKEN_FORMAT",
  INVALID_TOKEN_PAYLOAD: "INVALID_TOKEN_PAYLOAD",
  UNAUTHORIZED: "UNAUTHORIZED",
  ACCOUNT_EXISTS: "ACCOUNT_EXISTS",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR"
} as const;

export const ERROR_MESSAGES = {
  VALIDATION_ERROR:
    "We couldn't process your request due to invalid data. Please check your information and try again",
  INVALID_CREDENTIALS:
    "The email or password you entered is incorrect. Please try again",
  AUTHENTICATION_REQUIRED: "Please log in to access this resource",
  AUTHENTICATION_TOKEN_REQUIRED:
    "Authentication token is missing. Please log in again",
  UNAUTHORIZED:
    "Access denied. Please ensure you're logged in with the correct account",
  INVALID_TOKEN: "Your session has expired or is invalid. Please log in again",
  INVALID_TOKEN_FORMAT: "Authentication format is invalid. Please log in again",
  INVALID_TOKEN_PAYLOAD:
    "Your session information is incomplete. Please log in again",
  ACCOUNT_EXISTS:
    "An account with this email address already exists. Please use a different email or try logging in",
  INTERNAL_SERVER_ERROR:
    "Something went wrong on our end. Please try again later or contact support if the problem persists"
} as const;
