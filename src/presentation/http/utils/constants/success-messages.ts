/**
 * Centralized success codes and messages for HTTP responses
 */
export const HTTP_SUCCESS_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204
} as const;

export const SUCCESS_CODES = {
  ACCOUNT_CREATED: "ACCOUNT_CREATED",
  ACCOUNT_VERIFIED: "ACCOUNT_VERIFIED",
  AUTHENTICATED: "AUTHENTICATED",
  TOKEN_REFRESHED: "TOKEN_REFRESHED",
  OPERATION_SUCCESS: "OPERATION_SUCCESS",
  RESOURCE_RETRIEVED: "RESOURCE_RETRIEVED",
  RESOURCE_UPDATED: "RESOURCE_UPDATED",
  RESOURCE_DELETED: "RESOURCE_DELETED"
} as const;

export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED:
    "Your account has been created successfully. You can now sign in using your credentials",
  ACCOUNT_VERIFIED:
    "Your email has been verified successfully. Thank you for confirming your account",
  AUTHENTICATED: "You have been authenticated successfully. Welcome back",
  TOKEN_REFRESHED: "Your session has been refreshed successfully",
  OPERATION_SUCCESS: "Your request has been processed successfully",
  RESOURCE_RETRIEVED:
    "The requested information has been retrieved successfully",
  RESOURCE_UPDATED: "The information has been updated successfully",
  RESOURCE_DELETED: "The resource has been deleted successfully"
} as const;
