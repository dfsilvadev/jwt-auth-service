import { AuthenticationMiddleware } from "../../application/middlewares/authentication-middleware";

import { makeTokenService } from "./make-token-service";

export function makeAuthenticationMiddleware() {
  const tokenService = makeTokenService();

  return new AuthenticationMiddleware(tokenService);
}
