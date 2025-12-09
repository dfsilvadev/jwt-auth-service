import { makeTokenService } from "../../infrastructure/factories/make-token-service";
import { AuthenticationMiddleware } from "../http/middlewares/authentication.middleware";

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware(makeTokenService());
}
