import { env } from "../../../application/config/env/env";
import { PrismaClient } from "../../../generated/prisma";
import { logger } from "../../logger";

/**
 * Prisma Client singleton
 * Garante uma única instância do Prisma Client em toda a aplicação
 */
class PrismaClientSingleton {
  private static instance: PrismaClient | null = null;

  static getInstance(): PrismaClient {
    if (!this.instance) {
      const clientConfig: {
        log: ("query" | "error" | "warn")[];
      } = {
        log:
          env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"]
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
  }
}

export const prismaClient = PrismaClientSingleton.getInstance();
