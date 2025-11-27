/* eslint-disable no-unused-vars */

/**
 * Interface para implementação de loggers
 * Facilita a troca de implementação (console.log, pino, winston, etc.)
 */
export interface ILogger {
  success(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  warning(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
}
