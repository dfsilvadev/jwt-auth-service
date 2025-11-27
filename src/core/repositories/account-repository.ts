import { prismaClient } from "../../infra/db/prisma/prisma-client";

import { type Prisma } from "../../generated";

interface CreateInput {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export class AccountRepository {
  private async findUnique(where: Prisma.AccountWhereUniqueInput) {
    return await prismaClient.account.findUnique({
      where
    });
  }

  async findByEmail(email: string) {
    const foundAccount = await this.findUnique({ email });

    return foundAccount;
  }

  async findById(accountId: string) {
    const foundAccount = await this.findUnique({ id: accountId });

    return foundAccount;
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
}
