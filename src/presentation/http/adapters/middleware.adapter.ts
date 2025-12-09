import type { NextFunction, Request, Response } from "express";

import { toHttpResponse } from "../errors";
import type { Middleware } from "../middlewares/authentication.middleware";

/**
 * Middleware Adapter
 * Adapts Express middleware to domain middleware interface
 */
export function middlewareAdapter(middleware: Middleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await middleware.handle({
        headers: request.headers as Record<string, string | string[]>
      });

      if (!request.metadata) {
        request.metadata = {};
      }

      request.metadata = {
        ...request.metadata,
        ...result.data
      };

      next();
    } catch (error) {
      const { statusCode, body } = toHttpResponse(error);
      return response.status(statusCode).json(body);
    }
  };
}
