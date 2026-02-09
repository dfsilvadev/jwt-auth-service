/**
 * Repository interface for Role entity
 * This is a domain contract - implementations are in infrastructure layer
 */

import type { PermissionsCodes } from "../entities/roles.entity";

export interface RoleRepository {
  getPermissionsCodeByRoleId(_roleId: string): Promise<PermissionsCodes>;
}
