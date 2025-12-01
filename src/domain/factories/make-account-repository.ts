import { AccountRepository } from "../repositories/account-repository";

export function makeAccountRepository() {
  return new AccountRepository();
}
