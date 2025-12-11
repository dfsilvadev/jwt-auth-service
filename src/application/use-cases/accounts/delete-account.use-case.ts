import { AccountDoesNotExistError } from "../../../domain/errors";
import { ForbiddenError } from "../../../domain/errors/forbidden-error";

import type { AccountRepository } from "../../../domain/repositories/account.repository";
import type { DeleteAccountDto } from "../../dtos/accounts/delete-account.dto";

/**
 * Delete Account Use Case
 * Orchestrates the account deletion flow
 */

export class DeleteAccountUseCase {
  constructor(private readonly _accountRepository: AccountRepository) {}

  async execute(input: DeleteAccountDto) {
    const account = await this._accountRepository.findById(input.accountId);
    if (!account) throw new AccountDoesNotExistError(input.accountId);

    if (account.id !== input.actor.id)
      throw new ForbiddenError("Cannot delete another user's account");

    await this._accountRepository.delete(input.accountId);
  }
}
