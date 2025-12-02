import { Router } from "express";

import { middlewareAdapter } from "../../../../server/adapters/middleware-adapter";
import { routeAdapter } from "../../../../server/adapters/route-adapter";

import { makeAuthenticationMiddleware } from "../../../../domain/factories/make-authentication-middleware";
import { makeListAccountsController } from "../../../../domain/factories/make-list-accounts-controller";

const router = Router();

router.get(
  "/",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListAccountsController())
);

export default router;
