import type { PermissionsCodes } from "../../../domain/entities/roles.entity";
import type { RoleRepository } from "../../../domain/repositories/role.repository";

export class GetRolesPermissionsUseCase {
  constructor(private readonly _rolesRepository: RoleRepository) {}

  async execute(roleId: string): Promise<PermissionsCodes> {
    const permissions =
      await this._rolesRepository.getPermissionsCodeByRoleId(roleId);

    if (!permissions) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    return permissions;
  }
}
