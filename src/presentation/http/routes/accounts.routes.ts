import { Router } from "express";

import { makeAuthenticationMiddleware } from "../../factories/make-authentication-middleware";
import { makeGetAccountByIdController } from "../../factories/make-get-account-by-id-controller";
import { makeListAccountsController } from "../../factories/make-list-accounts-controller";
import { makeUpdateAccountController } from "../../factories/make-update-account-controller";

import { middlewareAdapter } from "../adapters/middleware.adapter";
import { routeAdapter } from "../adapters/route.adapter";

const router = Router();

router.get(
  "/",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListAccountsController())
);
router.get(
  "/:accountId",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetAccountByIdController())
);
router.patch(
  "/:accountId",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateAccountController())
);

export default router;
