import { makeSignInUseCase } from "../../infrastructure/factories/make-sign-in-use-case";
import { SignInController } from "../http/controllers/auth/sign-in.controller";

export function makeSignInController() {
  return new SignInController(makeSignInUseCase());
}
