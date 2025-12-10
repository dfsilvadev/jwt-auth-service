import { makeUpdateAccountUseCase } from "../../infrastructure/factories/make-update-account-use-case";
import { UpdateAccountController } from "../http/controllers/accounts/update-account.controller";

export function makeUpdateAccountController() {
  return new UpdateAccountController(makeUpdateAccountUseCase());
}
