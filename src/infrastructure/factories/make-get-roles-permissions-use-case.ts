import { GetRolesPermissionsUseCase } from "../../application/use-cases/roles/get-roles-permissions.use-case";

import { makeRolesRepository } from "./make-roles-repository";

export function makeGetRolesPermissionsUseCase() {
  const rolesRepository = makeRolesRepository();
  return new GetRolesPermissionsUseCase(rolesRepository);
}
