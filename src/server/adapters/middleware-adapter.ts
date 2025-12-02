import { toHttpResponse } from "../../application/http/exceptions/utils/http-error-mapper";

import type { NextFunction, Request, Response } from "express";
import type { Middleware } from "../../domain/entities/middleware.interface";

export function middlewareAdapter(middleware: Middleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await middleware.handle({
        headers: request.headers as Record<string, string | string[]>
      });

      if ("statusCode" in result) {
        return response.status(result.statusCode).json(result.body);
      }

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
