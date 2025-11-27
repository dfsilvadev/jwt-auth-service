/* eslint-disable no-console */
import { ILogger } from "./logger.interface";

/**
 * Implementação de logger usando console.log
 * Pode ser facilmente substituída por pino, winston, etc.
 */
export class ConsoleLogger implements ILogger {
  success(message: string, ...args: unknown[]): void {
    console.log(`✅ [SUCCESS] ${message}`, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(`❌ [ERROR] ${message}`, ...args);
  }

  warning(message: string, ...args: unknown[]): void {
    console.warn(`⚠️  [WARNING] ${message}`, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    console.info(`ℹ️  [INFO] ${message}`, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    console.debug(`🔍 [DEBUG] ${message}`, ...args);
  }
}
