import { AccountStatus, Prisma } from "../../generated";
import { prismaClient } from "../../infra/db/prisma/prisma-client";

interface CreateInput {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export class AccountRepository {
  private readonly selectAccountFields = {
    id: true,
    name: true,
    email: true,
    status: true,
    createdAt: true,
    updatedAt: true
  };

  async findByEmail(email: string) {
    const foundAccount = await this.findUnique({ email });

    return foundAccount;
  }

  async findById(accountId: string) {
    const foundAccount = await this.findUnique({ id: accountId });

    return foundAccount;
  }

  async findAll({ status }: { status?: AccountStatus }) {
    const whereClause: { status?: AccountStatus } = {};

    if (status) {
      whereClause.status = status;
    }

    const rows = await prismaClient.account.findMany({
      where: whereClause,
      select: this.selectAccountFields
    });

    return rows;
  }

  async create({ name, email, password }: CreateInput) {
    const newAccount = await prismaClient.account.create({
      data: {
        name,
        email,
        passwordHash: password
      }
    });

    return newAccount;
  }

  private async findUnique(where: Prisma.AccountWhereUniqueInput) {
    return await prismaClient.account.findUnique({
      where
    });
  }
}
