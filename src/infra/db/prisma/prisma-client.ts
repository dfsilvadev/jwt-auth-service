import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { env } from "../../../application/config/env/env";
import { PrismaClient } from "../../../generated";
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
      // Cria o pool do PostgreSQL
      if (!this.pool) {
        this.pool = new Pool({
          connectionString: env.DATABASE_URL
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

      process.on("beforeExit", async () => {
        await this.instance?.$disconnect();
        logger.info("[Prisma] Disconnected from database");
      });
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
