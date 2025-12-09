import { DomainError } from "./domain-error";

export class AccountAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super(
      `An account with email ${email} already exists`,
      "ACCOUNT_ALREADY_EXISTS",
      { email }
    );
  }
}
