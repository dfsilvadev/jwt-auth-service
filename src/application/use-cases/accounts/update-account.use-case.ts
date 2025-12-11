import {
  AccountAlreadyExistsError,
  AccountDoesNotExistError
} from "../../../domain/errors";

import type { AccountRepository } from "../../../domain/repositories/account.repository";
import type {
  UpdateAccountDTO,
  UpdateAccountResult
} from "../../dtos/accounts/update-account.dto";

/**
 * Update Account Use Case
 * Orchestrates the account update flow
 */

export class UpdateAccountUseCase {
  constructor(private readonly _accountRepository: AccountRepository) {}

  async execute(input: UpdateAccountDTO): Promise<UpdateAccountResult> {
    const account = await this._accountRepository.findById(input.accountId);
    if (!account) throw new AccountDoesNotExistError(input.accountId);

    const { name, email } = input.body;

    if (email && email !== account.email) {
      const existingAccount = await this._accountRepository.findByEmail(email);
      if (existingAccount) {
        throw new AccountAlreadyExistsError(email);
      }
    }

    const updateData: { name?: string; email?: string } = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;

    const updated = await this._accountRepository.update(
      input.accountId,
      updateData
    );

    const accountUpdatedResult = {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      status: updated.status,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
      deletedAt: updated.deletedAt
    };

    return { account: accountUpdatedResult };
  }
}
