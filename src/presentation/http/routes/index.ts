import { Router } from "express";

import accountsRoutes from "./accounts.routes";
import authRoutes from "./auth.routes";
import healthRoutes from "./health.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/accounts", accountsRoutes);

export default router;
