import { UpdateAccountUseCase } from "../../application/use-cases/accounts/update-account.use-case";
import { makeAccountRepository } from "./make-account-repository";

export function makeUpdateAccountUseCase() {
  const accountRepository = makeAccountRepository();
  return new UpdateAccountUseCase(accountRepository);
}
