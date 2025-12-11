import type { AccountRepository } from "../../../domain/repositories/account.repository";

import type {
  ListAccountsDTO,
  ListAccountsResult
} from "../../dtos/accounts/list-accounts.dto";

/**
 * List Accounts Use Case
 * Orchestrates the account listing flow
 */
export class ListAccountsUseCase {
  constructor(private readonly _accountRepository: AccountRepository) {}

  async execute(input: ListAccountsDTO): Promise<ListAccountsResult> {
    const accounts = await this._accountRepository.findAll({
      status: input.status ?? "ACTIVE"
    });

    return {
      accounts: accounts.map((account) => ({
        id: account.id,
        name: account.name,
        email: account.email,
        status: account.status,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
        deletedAt: account.deletedAt
      }))
    };
  }
}
