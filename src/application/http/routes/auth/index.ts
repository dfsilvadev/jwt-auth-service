import { Router } from "express";

import { routeAdapter } from "../../../../server/adapters/route-adapter";

import { authLimiter, signUpLimiter } from "../../../config/rate-limit-config";

import { makeSignInController } from "../../../../core/factories/make-sign-in-controller";
import { makeSignUpController } from "../../../../core/factories/make-sign-up-controller";

const router = Router();

router.post("/sign-up", signUpLimiter, routeAdapter(makeSignUpController()));
router.post("/sign-in", authLimiter, routeAdapter(makeSignInController()));

export default router;
