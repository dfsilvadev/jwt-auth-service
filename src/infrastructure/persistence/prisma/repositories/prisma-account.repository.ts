import { prismaClient } from "../prisma-client";

import type {
  Account,
  AccountFilters,
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

    return data ? this.toDomain(data) : null;
  }

  async findById(id: string): Promise<Account | null> {
    const data = await prismaClient.account.findUnique({
      where: { id }
    });

    return data ? this.toDomain(data) : null;
  }

  async findAll(filters?: AccountFilters): Promise<Account[]> {
    const rows = await prismaClient.account.findMany({
      where: filters?.status ? { status: filters.status as any } : undefined,
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true
      }
    });

    return rows.map((row) => this.toDomain(row));
  }

  async create(data: CreateAccountData): Promise<Account> {
    const created = await prismaClient.account.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash
      }
    });

    return this.toDomain(created);
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

    return this.toDomain(updated);
  }

  async delete(accountId: string) {
    await prismaClient.account.update({
      where: {
        id: accountId
      },
      data: {
        deletedAt: new Date()
      }
    });
  }

  private toDomain(data: Account): Account {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      status: data.status ?? undefined,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt ?? undefined
    };
  }
}
