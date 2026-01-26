import {
  AccountDoesNotExistError,
  ForbiddenError
} from "../../../domain/errors";

import type { AccountRepository } from "../../../domain/repositories/account.repository";
import type { DeleteAccountDTO } from "../../dtos/accounts/delete-account.dto";

/**
 * Delete Account Use Case
 * Orchestrates the account deletion flow
 */

export class DeleteAccountUseCase {
  constructor(private readonly _accountRepository: AccountRepository) {}

  async execute(input: DeleteAccountDTO) {
    if (!input.actor.id) throw new ForbiddenError();

    const account = await this._accountRepository.findById(input.accountId);
    if (!account) throw new AccountDoesNotExistError(input.accountId);

    await this._accountRepository.delete(input.accountId);
  }
}
