import { GetAccountByIdUseCase } from "../../application/use-cases/accounts/get-account-by-id.use-case";
import { makeAccountRepository } from "./make-account-repository";

export function makeGetAccountByIdUseCase() {
  const accountRepository = makeAccountRepository();
  return new GetAccountByIdUseCase(accountRepository);
}
