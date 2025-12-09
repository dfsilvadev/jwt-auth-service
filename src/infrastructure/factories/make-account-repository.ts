import { PrismaAccountRepository } from "../persistence/prisma/repositories/prisma-account.repository";

export function makeAccountRepository() {
  return new PrismaAccountRepository();
}
