import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error";

import { AccountRepository } from "../../../domain/repositories/account.repository";

import type {
  GetAccountByIdDTO,
  GetAccountByIdResult
} from "../../dtos/accounts/get-account-by-id.dto";

export class GetAccountByIdUseCase {
  constructor(private readonly _accountRepository: AccountRepository) {}

  async execute(
    input: GetAccountByIdDTO
  ): Promise<GetAccountByIdResult | null> {
    const account = await this._accountRepository.findById(input.accountId);

    if (!account) throw new AccountDoesNotExistError(input.accountId);

    const accountResult = {
      id: account.id,
      name: account.name,
      email: account.email,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt
    };

    return { account: accountResult };
  }
}
