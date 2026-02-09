import { prismaClient } from "../prisma-client";

import type { PermissionsCodes } from "../../../../domain/entities/roles.entity";
import type { RoleRepository } from "../../../../domain/repositories/role.repository";

export class PrismaRoleRepository implements RoleRepository {
  async getPermissionsCodeByRoleId(roleId: string): Promise<PermissionsCodes> {
    const rows = await prismaClient.rolePermission.findMany({
      where: { roleId },
      select: { permissionCode: true }
    });

    const permissionsCodes = rows.map((row) => row.permissionCode);

    return permissionsCodes;
  }
}
