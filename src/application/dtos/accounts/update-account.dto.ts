import type { UpdateAccountData } from "../../../domain/entities/account.entity";
import type { GetAccountByIdResult } from "./get-account-by-id.dto";

export interface UpdateAccountDTO {
  readonly accountId: string;
  readonly body: UpdateAccountData;
}

export interface UpdateAccountResult extends GetAccountByIdResult {}
