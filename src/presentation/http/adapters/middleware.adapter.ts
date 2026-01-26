import type { NextFunction, Request, Response } from "express";

import { toHttpResponse } from "../errors";

import { Middleware } from "../middlewares/dtos/middlewares.dto";

/**
 * Middleware Adapter
 * Adapts Express middleware to domain middleware interface
 */
export function middlewareAdapter(middleware: Middleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { headers, body, params, query } = request;
      const result = await middleware.handle({
        headers: headers as Record<string, string | string[]>,
        body,
        params,
        query,
        metadata: request.metadata
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
