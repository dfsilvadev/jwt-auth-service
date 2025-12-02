import "dotenv/config";
import { z } from "zod";

import { AppError } from "../../../application/http/exceptions/app-error";

import { logger } from "../../../infra/logger";

const SECONDS_IN_MINUTE = 60;
const MINUTES_TO_CONVERT = 15;
const SALT_ROUNDS = 10;

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters long")
    .refine(
      (secret) => secret !== "your-secret-here" && secret !== "change-me",
      "JWT_SECRET cannot be a placeholder value"
    ),
  JWT_ISSUER: z.string().default("auth-jwt"),
  ACCESS_TOKEN_TTL: z.coerce
    .number()
    .min(SECONDS_IN_MINUTE, "ACCESS_TOKEN_TTL must be at least 60 seconds")
    .default(MINUTES_TO_CONVERT * SECONDS_IN_MINUTE), // 15 minutes
  PASSWORD_SALT_ROUNDS: z.coerce.number().min(4).max(15).default(SALT_ROUNDS),
  DATABASE_URL: z
    .string()
    .url("DATABASE_URL must be a valid PostgreSQL connection string")
    .refine(
      (url) => url.startsWith("postgresql://") || url.startsWith("postgres://"),
      "DATABASE_URL must start with postgresql:// or postgres://"
    ),
  CORS_ORIGINS: z
    .string()
    .default(
      "http://localhost:3000,http://localhost:3002,http://localhost:5173"
    )
    .transform((str) => str.split(",").map((s) => s.trim()))
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  logger.error("Invalid environment variables!", _env.error.format());

  throw new AppError(
    "Invalid environment variables!",
    500,
    "INVALID_ENV",
    _env.error.format(),
    false
  );
}

export const env = _env.data;
