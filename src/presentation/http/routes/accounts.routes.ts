import { Router } from "express";

import { makeAuthenticationMiddleware } from "../../factories/make-authentication-middleware";
import { makeListAccountsController } from "../../factories/make-list-accounts-controller";
import { middlewareAdapter } from "../adapters/middleware.adapter";
import { routeAdapter } from "../adapters/route.adapter";

const router = Router();

router.get(
  "/",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListAccountsController())
);

export default router;
