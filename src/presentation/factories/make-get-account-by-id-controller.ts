import { makeGetAccountByIdUseCase } from "../../infrastructure/factories/make-get-account-by-id-use-case";
import { GetAccountByIdController } from "../http/controllers/accounts/get-account-by-id.controller";

export function makeGetAccountByIdController() {
  const getAccountByIdUseCase = makeGetAccountByIdUseCase();
  return new GetAccountByIdController(getAccountByIdUseCase);
}
