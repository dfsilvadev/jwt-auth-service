import { SignUpUseCase } from "../../application/use-cases/auth/sign-up.use-case";
import { makeAccountRepository } from "./make-account-repository";
import { makePasswordHasher } from "./make-password-hasher";

export function makeSignUpUseCase() {
  return new SignUpUseCase(makeAccountRepository(), makePasswordHasher());
}
