import { config } from "dotenv";
import path from "node:path";
import type { PrismaConfig } from "prisma";

// Carregar variáveis de ambiente
config();

export default {
  schema: path.join("prisma"),
  datasource: {
    url: process.env.DATABASE_URL || ""
  }
} satisfies PrismaConfig;
