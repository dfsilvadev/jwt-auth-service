/**
 * Centralized success codes and messages for the application.
 * This file contains all success codes, HTTP status codes, and default messages.
 *
 * HTTP Status Code Semantics:
 * - 200 (OK): Generic success for read/update operations
 * - 201 (Created): Resource created successfully
 * - 202 (Accepted): Request accepted for asynchronous processing
 * - 204 (No Content): Success with no response body
 */

export const HTTP_SUCCESS_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204
} as const;

export const SUCCESS_CODES = {
  // Auth / Account
  ACCOUNT_CREATED: "ACCOUNT_CREATED",
  ACCOUNT_VERIFIED: "ACCOUNT_VERIFIED",
  AUTHENTICATED: "AUTHENTICATED",
  TOKEN_REFRESHED: "TOKEN_REFRESHED",

  // Generic operations
  OPERATION_SUCCESS: "OPERATION_SUCCESS",
  RESOURCE_RETRIEVED: "RESOURCE_RETRIEVED",
  RESOURCE_UPDATED: "RESOURCE_UPDATED",
  RESOURCE_DELETED: "RESOURCE_DELETED"
} as const;

export const SUCCESS_MESSAGES = {
  // Auth / Account
  ACCOUNT_CREATED:
    "Your account has been created successfully. You can now sign in using your credentials",
  ACCOUNT_VERIFIED:
    "Your email has been verified successfully. Thank you for confirming your account",
  AUTHENTICATED: "You have been authenticated successfully. Welcome back",
  TOKEN_REFRESHED: "Your session has been refreshed successfully",

  // Generic operations
  OPERATION_SUCCESS: "Your request has been processed successfully",
  RESOURCE_RETRIEVED:
    "The requested information has been retrieved successfully",
  RESOURCE_UPDATED: "The information has been updated successfully",
  RESOURCE_DELETED: "The resource has been deleted successfully"
} as const;

/**
 * Helper type to ensure type-safety when using success codes
 */
export type SuccessCode = (typeof SUCCESS_CODES)[keyof typeof SUCCESS_CODES];

/**
 * Helper type to ensure type-safety when using success messages
 */
export type SuccessMessage =
  (typeof SUCCESS_MESSAGES)[keyof typeof SUCCESS_MESSAGES];
