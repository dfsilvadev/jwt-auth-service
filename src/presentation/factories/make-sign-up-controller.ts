import { makeSignUpUseCase } from "../../infrastructure/factories/make-sign-up-use-case";
import { SignUpController } from "../http/controllers/auth/sign-up.controller";

export function makeSignUpController() {
  return new SignUpController(makeSignUpUseCase());
}
