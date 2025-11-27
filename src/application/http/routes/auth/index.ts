import { Router } from "express";

import { authLimiter, signUpLimiter } from "../../../config/rate-limit-config";

const router = Router();

router.post("/sign-up", signUpLimiter);
router.post("/sign-in", authLimiter);

export default router;
