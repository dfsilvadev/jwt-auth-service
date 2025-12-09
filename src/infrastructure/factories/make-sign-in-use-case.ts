import { SignInUseCase } from "../../application/use-cases/auth/sign-in.use-case";
import { makeAccountRepository } from "./make-account-repository";
import { makePasswordHasher } from "./make-password-hasher";
import { makeTokenService } from "./make-token-service";

export function makeSignInUseCase() {
  return new SignInUseCase(
    makeAccountRepository(),
    makePasswordHasher(),
    makeTokenService()
  );
}
