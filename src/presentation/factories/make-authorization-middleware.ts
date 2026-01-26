import { AuthorizationMiddleware } from "../http/middlewares/authorization.middleware";

export function makeAuthorizationMiddleware(allowedRoles: string[]) {
  return new AuthorizationMiddleware(allowedRoles);
}
