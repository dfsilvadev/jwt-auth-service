import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error";

import { AccountRepository } from "../../../domain/repositories/account.repository";

import type {
  GetAccountByIdDTO,
  GetAccountByIdResult
} from "../../dtos/accounts/get-account-by-id.dto";

/**
 * Get Account By ID Use Case
 * Orchestrates the account retrieval flow by ID
 */
export class GetAccountByIdUseCase {
  constructor(private readonly _accountRepository: AccountRepository) {}

  async execute(input: GetAccountByIdDTO): Promise<GetAccountByIdResult> {
    const account = await this._accountRepository.findById(input.accountId);

    if (!account) throw new AccountDoesNotExistError(input.accountId);

    const accountResult = {
      id: account.id,
      name: account.name,
      email: account.email,
      status: account.status,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      deletedAt: account.deletedAt
    };

    return { account: accountResult };
  }
}
