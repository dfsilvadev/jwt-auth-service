import { AccountRepository } from "../../../domain/repositories/account-repository";

export class ListAccountsUseCase {
  constructor(private readonly _accountRepository: AccountRepository) {}

  async execute() {
    const accounts = await this._accountRepository.list();

    return { accounts };
  }
}
