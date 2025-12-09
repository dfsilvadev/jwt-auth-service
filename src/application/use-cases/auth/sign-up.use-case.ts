import { AccountAlreadyExistsError } from "../../../domain/errors/account-already-exists.error";
import type { AccountRepository } from "../../../domain/repositories/account.repository";
import type { PasswordHasher } from "../../../domain/services/password-hasher.service";

import type { SignUpDTO } from "../../dtos/auth/sign-up.dto";

/**
 * Sign Up Use Case
 * Orchestrates the account creation flow
 */
export class SignUpUseCase {
  constructor(
    private readonly _accountRepository: AccountRepository,
    private readonly _passwordHasher: PasswordHasher
  ) {}

  async execute(input: SignUpDTO): Promise<void> {
    const existingAccount = await this._accountRepository.findByEmail(
      input.email
    );

    if (existingAccount) {
      throw new AccountAlreadyExistsError(input.email);
    }

    const passwordHash = await this._passwordHasher.hash(input.password);

    await this._accountRepository.create({
      name: input.name,
      email: input.email,
      passwordHash
    });
  }
}
