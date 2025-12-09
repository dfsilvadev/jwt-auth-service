import type { NextFunction, Request, Response } from "express";

import type { Controller } from "../../../domain/entities/controller.interface";

/**
 * Route Adapter
 * Adapts Express Request/Response to domain HttpRequest/HttpResponse
 */
export function routeAdapter(controller: Controller) {
  return async (req: Request, res: Response, _next: NextFunction) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      metadata: (req as any).metadata
    };

    const httpResponse = await controller.handle(httpRequest);

    return res.status(httpResponse.statusCode).json(httpResponse.body);
  };
}
