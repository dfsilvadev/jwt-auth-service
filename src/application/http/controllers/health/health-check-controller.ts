import { prismaClient } from "../../../../infra/db/prisma/prisma-client";
import { logger } from "../../../../infra/logger";

import { HTTP_SUCCESS_STATUS } from "../../utils/constants/success-messages";

import type { Controller } from "../../../../domain/entities/controller";
import type { HttpRequest } from "../../../../domain/entities/request";
import type { HttpResponse } from "../../../../domain/entities/response";

export class HealthCheckController implements Controller {
  async handle(_request: HttpRequest): Promise<HttpResponse> {
    try {
      await prismaClient.$queryRaw`SELECT 1`;

      return {
        statusCode: HTTP_SUCCESS_STATUS.OK,
        body: {
          status: "healthy",
          timestamp: new Date().toISOString(),
          database: "connected"
        }
      };
    } catch (error) {
      logger.error("[Health Check] Database connection failed:", error);

      return {
        statusCode: 503,
        body: {
          status: "unhealthy",
          timestamp: new Date().toISOString(),
          database: "disconnected",
          error: "Database connection failed"
        }
      };
    }
  }
}
