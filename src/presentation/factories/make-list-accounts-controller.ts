import { makeListAccountsUseCase } from "../../infrastructure/factories/make-list-accounts-use-case";
import { ListAccountsController } from "../http/controllers/accounts/list-accounts.controller";

export function makeListAccountsController() {
  return new ListAccountsController(makeListAccountsUseCase());
}
