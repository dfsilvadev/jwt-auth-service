import { PasswordHasher } from "../../infra/security";

export function makePasswordHasher(saltRounds?: number) {
  return new PasswordHasher(saltRounds);
}
