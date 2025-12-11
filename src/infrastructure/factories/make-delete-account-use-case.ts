import { DeleteAccountUseCase } from "../../application/use-cases/accounts/delete-account.use-case";
import { makeAccountRepository } from "./make-account-repository";

export function makeDeleteAccountUseCase() {
  return new DeleteAccountUseCase(makeAccountRepository());
}
