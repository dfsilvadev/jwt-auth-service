import { ListAccountsController } from "../../application/http/controllers/accounts/list-accounts.controller";

import { makeListAccountsUseCase } from "./make-list-accounts-use-case";

export function makeListAccountsController() {
  const listAccountUseCase = makeListAccountsUseCase();

  return new ListAccountsController(listAccountUseCase);
}
