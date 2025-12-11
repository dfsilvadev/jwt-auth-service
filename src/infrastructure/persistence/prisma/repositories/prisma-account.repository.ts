import { prismaClient } from "../prisma-client";

import type {
  Account,
  AccountFilters,
  AccountWithoutPassword,
  CreateAccountData
} from "../../../../domain/entities/account.entity";
import type { AccountRepository } from "../../../../domain/repositories/account.repository";

/**
 * Prisma Account Repository Implementation
 * Implements AccountRepository interface using Prisma
 */
export class PrismaAccountRepository implements AccountRepository {
  async findByEmail(email: string): Promise<Account | null> {
    const data = await prismaClient.account.findUnique({
      where: { email }
    });

    return data;
  }

  async findById(id: string): Promise<Account | null> {
    const data = await prismaClient.account.findUnique({
      where: { id }
    });

    return data;
  }

  async findAll(filters?: AccountFilters): Promise<AccountWithoutPassword[]> {
    const rows = await prismaClient.account.findMany({
      where: filters?.status ? { status: filters.status as any } : undefined,
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true
      }
    });

    return rows;
  }

  async create(data: CreateAccountData): Promise<Account> {
    const created = await prismaClient.account.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash
      }
    });

    return created;
  }

  async update(
    accountId: string,
    data: Partial<{ name: string; email: string }>
  ): Promise<Account> {
    const updated = await prismaClient.account.update({
      where: {
        id: accountId
      },
      data
    });

    return updated;
  }

  async delete(accountId: string) {
    await prismaClient.account.update({
      where: {
        id: accountId
      },
      data: {
        deletedAt: new Date(),
        status: "DELETED"
      }
    });
  }
}
