import { randomUUID } from "node:crypto";

import { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials.error";
import type { AccountRepository } from "../../../domain/repositories/account.repository";
import type { PasswordHasher, TokenService } from "../../../domain/services";

import type { SignInDTO, SignInResult } from "../../dtos/auth/sign-in.dto";

/**
 * Sign In Use Case
 * Orchestrates the authentication flow
 */
export class SignInUseCase {
  constructor(
    private readonly _accountRepository: AccountRepository,
    private readonly _passwordHasher: PasswordHasher,
    private readonly _tokenService: TokenService
  ) {}

  async execute(input: SignInDTO): Promise<SignInResult> {
    const account = await this._accountRepository.findByEmail(input.email);

    if (!account) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await this._passwordHasher.compare(
      input.password,
      account.passwordHash
    );

    if (!isPasswordValid) throw new InvalidCredentialsError();

    const token = this._tokenService.generate({
      account: {
        id: account.id,
        role: account.role
      },
      sessionId: randomUUID()
    });

    return {
      accessToken: token.value,
      expiresIn: token.expiresIn
    };
  }
}
