import { Router } from "express";

import authRoutes from "./auth";
import healthRoutes from "./health";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);

export default router;
