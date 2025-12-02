import { randomUUID } from "node:crypto";

import { AccountRepository } from "../../../domain/repositories/account-repository";

import { PasswordHasher } from "../../../infra/security";
import { TokenService } from "../../services/auth/token-service";

import { AccountDeletedError } from "../../http/exceptions/account-deleted-error";
import { AccountPendingError } from "../../http/exceptions/account-pending-error";
import { AccountSuspendedError } from "../../http/exceptions/account-suspended-error";
import { InvalidCredentialsError } from "../../http/exceptions/invalid-credentials-error";

import type { SignInSchema } from "../../http/schema/sign-in.schema";

type SignInUseCaseRequest = SignInSchema;

interface SignInUseCaseResponse {
  readonly accessToken: string;
  readonly expiresIn: number;
}

export class SignInUseCase {
  constructor(
    private readonly _accountRepository: AccountRepository,
    private readonly _passwordHasher: PasswordHasher,
    private readonly _tokenService: TokenService
  ) {}

  async execute({
    email,
    password
  }: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const foundAccount = await this._accountRepository.findByEmail(email);

    if (!foundAccount) throw new InvalidCredentialsError();

    if (foundAccount.status === "SUSPENDED") throw new AccountSuspendedError();

    if (foundAccount.status === "PENDING") throw new AccountPendingError();

    if (foundAccount.status === "DELETED") throw new AccountDeletedError();

    const isPasswordValid = await this._passwordHasher.compare(
      password,
      foundAccount.passwordHash
    );

    if (!isPasswordValid) throw new InvalidCredentialsError();

    const { token: accessToken, expiresIn } =
      this._tokenService.generateAccessToken({
        accountId: foundAccount.id,
        sessionId: randomUUID()
      });

    return { accessToken, expiresIn };
  }
}
