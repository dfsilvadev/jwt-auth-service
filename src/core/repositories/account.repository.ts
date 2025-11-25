import { prismaClient } from "../../infra/db/prisma/prisma-client";

interface CreateInput {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export class AccountRepository {
  private async findUnique(param: { type: "id" | "email"; value: string }) {
    return await prismaClient.account.findUnique({
      where: param.type === "id" ? { id: param.value } : { email: param.value }
    });
  }

  async findByEmail(email: string) {
    const foundAccount = await this.findUnique({
      type: "email",
      value: email
    });

    return foundAccount;
  }

  async findById(accountId: string) {
    const foundAccount = await this.findUnique({
      type: "id",
      value: accountId
    });

    return foundAccount;
  }

  async create({ name, email, password }: CreateInput) {
    const newAccount = await prismaClient.account.create({
      data: {
        name,
        email,
        password
      }
    });

    return newAccount;
  }
}
