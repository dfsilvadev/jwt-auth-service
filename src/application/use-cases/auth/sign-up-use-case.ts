import { AccountRepository } from "../../../core/repositories/account.repository";

import { PasswordHasher } from "../../../infra/security";

import { AccountAlreadyExistsError } from "../../errors/account-already-exists-error";

interface SignUpUseCaseRequest {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

type SignUpUseCaseResponse = void;

export class SignUpUseCase {
  constructor(
    private readonly _accountRepository: AccountRepository,
    private readonly _passwordHasher: PasswordHasher
  ) {}

  async execute({
    name,
    email,
    password
  }: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
    const accountAlreadyExists =
      await this._accountRepository.findByEmail(email);

    if (accountAlreadyExists) throw new AccountAlreadyExistsError(email);

    const hashedPassword = await this._passwordHasher.hash(password);

    await this._accountRepository.create({
      name,
      email,
      password: hashedPassword
    });
  }
}
