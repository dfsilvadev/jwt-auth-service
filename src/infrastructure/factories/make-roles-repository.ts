import { PrismaRoleRepository } from "../persistence/prisma/repositories/prisma-role.repository";

export function makeRolesRepository() {
  return new PrismaRoleRepository();
}
