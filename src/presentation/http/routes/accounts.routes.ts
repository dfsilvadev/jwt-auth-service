import { Router } from "express";

import { makeAuthenticationMiddleware } from "../../factories/make-authentication-middleware";
import { makeAuthorizationMiddleware } from "../../factories/make-authorization-middleware";
import { makeDeleteAccountController } from "../../factories/make-delete-account-controller";
import { makeGetAccountByIdController } from "../../factories/make-get-account-by-id-controller";
import { makeListAccountsController } from "../../factories/make-list-accounts-controller";
import { makeUpdateAccountController } from "../../factories/make-update-account-controller";

import { middlewareAdapter } from "../adapters/middleware.adapter";
import { routeAdapter } from "../adapters/route.adapter";

const router = Router();

router.get(
  "/",
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["users:read"])),
  routeAdapter(makeListAccountsController())
);
router.get(
  "/:accountId",
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["users:read"])),
  routeAdapter(makeGetAccountByIdController())
);
router.patch(
  "/:accountId",
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["users:write"])),
  routeAdapter(makeUpdateAccountController())
);
router.delete(
  "/:accountId",
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["users:write"])),
  routeAdapter(makeDeleteAccountController())
);

export default router;
