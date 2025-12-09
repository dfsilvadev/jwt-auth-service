/**
 * Base class for domain errors
 * Domain errors are business logic errors, not HTTP errors
 */
export abstract class DomainError extends Error {
  public readonly code: string;
  public readonly details?: unknown;

  constructor(message: string, code: string, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
