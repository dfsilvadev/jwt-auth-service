import { Router } from "express";

import accountsRoutes from "./accounts";
import authRoutes from "./auth";
import healthRoutes from "./health";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/accounts", accountsRoutes);

export default router;
