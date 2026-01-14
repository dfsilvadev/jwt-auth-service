import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../../../generated";
import { env } from "../../../presentation/server/config/env/env";
import { logger } from "../../logger";

/**
 * Prisma Client singleton
 * Garante uma única instância do Prisma Client em toda a aplicação
 */
class PrismaClientSingleton {
  private static instance: PrismaClient | null = null;
  private static pool: Pool | null = null;

  static getInstance(): PrismaClient {
    if (!this.instance) {
      // Cria o pool do PostgreSQL com configurações otimizadas
      if (!this.pool) {
        this.pool = new Pool({
          connectionString: env.DATABASE_URL,
          // Otimizações de performance
          max: 20, // Máximo de conexões no pool (padrão: 10)
          min: 2, // Mínimo de conexões mantidas (padrão: 0)
          idleTimeoutMillis: 30000, // Fecha conexões idle após 30s (padrão: 10000)
          connectionTimeoutMillis: 2000, // Timeout para obter conexão (padrão: 0)
          // Permite reutilizar conexões de forma mais eficiente
          allowExitOnIdle: false
        });
      }

      // Cria o adapter do Prisma
      const adapter = new PrismaPg(this.pool);

      const clientConfig = {
        adapter,
        log:
          env.NODE_ENV === "development"
            ? (["query", "error", "warn"] as ("query" | "error" | "warn")[])
            : (["error"] as "error"[])
      };

      this.instance = new PrismaClient(clientConfig);

      this.instance.$on("error" as never, (e: unknown) => {
        logger.error("[Prisma] Database error:", e);
      });

      // Registra handlers para encerramento gracioso
      const gracefulShutdown = async (signal: string) => {
        logger.info(
          `[Prisma] Received ${signal}, disconnecting from database...`
        );
        await PrismaClientSingleton.disconnect();
        process.exit(0);
      };

      process.once("SIGINT", () => gracefulShutdown("SIGINT"));
      process.once("SIGTERM", () => gracefulShutdown("SIGTERM"));
    }

    return this.instance;
  }

  static async disconnect(): Promise<void> {
    if (this.instance) {
      await this.instance.$disconnect();
      this.instance = null;
      logger.info("[Prisma] Disconnected from database");
    }
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      logger.info("[Prisma] Pool closed");
    }
  }
}

export const prismaClient = PrismaClientSingleton.getInstance();
