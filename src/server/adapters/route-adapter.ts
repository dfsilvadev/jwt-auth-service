import type { Request, Response } from "express";

import type { Controller } from "../../domain/entities/controller";

export function routeAdapter(controller: Controller) {
  return async (req: Request, resp: Response) => {
    const { statusCode, body } = await controller.handle({
      body: req.body
    });

    resp.status(statusCode).json(body);
  };
}
