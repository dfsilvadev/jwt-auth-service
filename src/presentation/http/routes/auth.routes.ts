import { Router } from "express";

import { makeSignInController } from "../../factories/make-sign-in-controller";
import { makeSignUpController } from "../../factories/make-sign-up-controller";
import {
  authLimiter,
  signUpLimiter
} from "../../server/config/rate-limit-config";
import { routeAdapter } from "../adapters/route.adapter";

const router = Router();

router.post("/sign-up", signUpLimiter, routeAdapter(makeSignUpController()));
router.post("/sign-in", authLimiter, routeAdapter(makeSignInController()));

export default router;
