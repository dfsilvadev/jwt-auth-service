import { Router } from "express";

import { routeAdapter } from "../adapters/route.adapter";
import { HealthCheckController } from "../controllers/health/health-check.controller";

const router = Router();
const healthCheckController = new HealthCheckController();

router.get("/", routeAdapter(healthCheckController));

export default router;
