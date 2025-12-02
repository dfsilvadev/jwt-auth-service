import { AccountRepository } from "../../../domain/repositories/account-repository";

import type { Account } from "../../../domain/entities/account.interface";
import type { AccountStatus } from "../../../generated";

type ListAccountsUseCaseRequest = {
  status?: AccountStatus;
};

interface ListAccountsUseCaseResponse {
  accounts: Account[];
}

export class ListAccountsUseCase {
  constructor(private readonly _accountRepository: AccountRepository) {}

  async execute({
    status
  }: ListAccountsUseCaseRequest): Promise<ListAccountsUseCaseResponse> {
    const accounts = await this._accountRepository.findAll({ status });

    return { accounts };
  }
}
