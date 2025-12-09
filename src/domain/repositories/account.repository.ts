import type {
  Account,
  AccountFilters,
  CreateAccountData
} from "../entities/account.entity";

/**
 * Repository interface for Account entity
 * This is a domain contract - implementations are in infrastructure layer
 */
export interface AccountRepository {
  findByEmail(_email: string): Promise<Account | null>;
  findById(_id: string): Promise<Account | null>;
  create(_data: CreateAccountData): Promise<Account>;
  findAll(_filters?: AccountFilters): Promise<Account[]>;
}
