import { Prisma } from "../../generated";
import { prismaClient } from "../../infra/db/prisma/prisma-client";

interface CreateInput {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export class AccountRepository {
  async findByEmail(email: string) {
    const foundAccount = await this.findUnique({ email });

    return foundAccount;
  }

  async findById(accountId: string) {
    const foundAccount = await this.findUnique({ id: accountId });

    return foundAccount;
  }

  async list() {
    const rows = await prismaClient.account.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
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
