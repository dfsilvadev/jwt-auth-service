/**
 * Domain Entity: Account
 * Represents a user account in the domain
 */
export interface Account {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CreateAccountData {
  readonly name: string;
  readonly email: string;
  readonly passwordHash: string;
}

export interface AccountFilters {
  readonly status?: string;
}

export interface AccountParams {
  readonly accountId?: string;
}

export interface UpdateAccountData {
  readonly name?: string;
  readonly email?: string;
}
