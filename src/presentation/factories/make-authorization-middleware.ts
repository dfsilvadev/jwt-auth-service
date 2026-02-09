import { makeGetRolesPermissionsUseCase } from "../../infrastructure/factories/make-get-roles-permissions-use-case";
import { AuthorizationMiddleware } from "../http/middlewares/authorization.middleware";

export function makeAuthorizationMiddleware(requiredPermissions: string[]) {
  const getRolesPermissionsUseCase = makeGetRolesPermissionsUseCase();
  return new AuthorizationMiddleware(
    requiredPermissions,
    getRolesPermissionsUseCase
  );
}
