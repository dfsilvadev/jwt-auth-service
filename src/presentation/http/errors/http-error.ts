/**
 * Base HTTP Error class
 * Used for HTTP-specific errors in the presentation layer
 */
export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;
  public readonly expose: boolean;

  constructor(
    message: string,
    statusCode: number,
    code: string,
    details?: unknown,
    expose: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.expose = expose;
    Error.captureStackTrace(this, this.constructor);
  }
}
