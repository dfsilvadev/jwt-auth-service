import { ListAccountsUseCase } from "../../application/use-cases/accounts/list-accounts.use-case";

import { makeAccountRepository } from "./make-account-repository";

export function makeListAccountsUseCase() {
  const accountRepository = makeAccountRepository();

  return new ListAccountsUseCase(accountRepository);
}
