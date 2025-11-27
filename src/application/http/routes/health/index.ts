import { Router, type Request, type Response } from "express";

import { HealthCheckController } from "../../controllers/health/health-check-controller";

const router = Router();
const healthCheckController = new HealthCheckController();

router.get("/", async (req: Request, res: Response) => {
  const httpRequest = {
    body: req.body
  };

  const httpResponse = await healthCheckController.handle(httpRequest);

  return res.status(httpResponse.statusCode).json(httpResponse.body);
});

export default router;
