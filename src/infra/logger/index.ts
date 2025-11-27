import { ConsoleLogger } from "./console-logger";
import { ILogger } from "./logger.interface";

/**
 * Singleton do logger
 * Por padrão usa ConsoleLogger, mas pode ser substituído facilmente
 *
 * Exemplo de uso:
 * ```typescript
 * import { logger } from '@/infra/logger';
 *
 * logger.success('Operação realizada com sucesso');
 * logger.error('Erro ao processar', error);
 * logger.warning('Atenção: valor pode estar incorreto');
 * ```
 *
 * Para trocar a implementação no futuro:
 * ```typescript
 * import { PinoLogger } from './pino-logger';
 * logger.setImplementation(new PinoLogger());
 * ```
 */
class LoggerManager {
  private implementation: ILogger;

  constructor() {
    this.implementation = new ConsoleLogger();
  }

  /**
   * Permite trocar a implementação do logger em runtime
   * Útil para testes ou mudança de biblioteca
   */
  setImplementation(implementation: ILogger): void {
    this.implementation = implementation;
  }

  success(message: string, ...args: unknown[]): void {
    this.implementation.success(message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.implementation.error(message, ...args);
  }

  warning(message: string, ...args: unknown[]): void {
    this.implementation.warning(message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.implementation.info(message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.implementation.debug(message, ...args);
  }
}

export const logger = new LoggerManager();
export type { ILogger } from "./logger.interface";
