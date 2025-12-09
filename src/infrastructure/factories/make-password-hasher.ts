import { env } from "../../presentation/server/config/env/env";
import { BcryptPasswordHasher } from "../security/bcrypt-password-hasher.service";

export function makePasswordHasher() {
  return new BcryptPasswordHasher(env.PASSWORD_SALT_ROUNDS);
}
