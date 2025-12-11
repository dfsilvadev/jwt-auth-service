import { ACCOUNT_STATUS } from "../../../domain/entities/account.entity";
import {
  AccountAlreadyExistsError,
  AccountDoesNotExistError,
  ForbiddenError
} from "../../../domain/errors";

import type { AccountRepository } from "../../../domain/repositories/account.repository";
import type { UpdateAccountDTO } from "../../dtos/accounts/update-account.dto";

/**
 * Update Account Use Case
 * Orchestrates the account update flow
 */

export class UpdateAccountUseCase {
  constructor(private readonly _accountRepository: AccountRepository) {}

  async execute(input: UpdateAccountDTO): Promise<void> {
    const account = await this._accountRepository.findById(input.accountId);
    if (!account) throw new AccountDoesNotExistError(input.accountId);

    if (account.status === (ACCOUNT_STATUS.DELETED as typeof account.status))
      throw new ForbiddenError("Cannot update deleted account");

    if (account.status === (ACCOUNT_STATUS.SUSPENDED as typeof account.status))
      throw new ForbiddenError("Cannot update suspended account");

    const { name, email } = input.body;

    if (email && email !== account.email) {
      const existingAccount = await this._accountRepository.findByEmail(email);
      if (existingAccount) {
        throw new AccountAlreadyExistsError(email);
      }
    }

    const updateData: { name?: string; email?: string } = {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email })
    };

    await this._accountRepository.update(input.accountId, updateData);
  }
}
