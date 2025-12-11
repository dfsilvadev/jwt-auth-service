import { makeDeleteAccountUseCase } from "../../infrastructure/factories/make-delete-account-use-case";
import { DeleteAccountController } from "../http/controllers/accounts/delete-account.controller";

export function makeDeleteAccountController() {
  return new DeleteAccountController(makeDeleteAccountUseCase());
}
