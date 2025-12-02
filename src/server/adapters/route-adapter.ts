import type { Request, Response } from "express";

import type { Controller } from "../../domain/entities/controller.interface";

export function routeAdapter(controller: Controller) {
  return async (req: Request, resp: Response) => {
    const { statusCode, body } = await controller.handle({
      body: req.body,
      params: req.params,
      query: req.query,
      metadata: (req as any).metadata,
      account: (req as any).metadata?.account
    });

    resp.status(statusCode).json(body);
  };
}
