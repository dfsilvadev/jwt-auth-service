import { SignUpDTO } from "../../application/dtos/auth/sign-up.dto";
import type {
  AccountStatus as PrismaAccountStatus,
  Role
} from "../../generated";

/**
 * Account Status Type
 * Represents the possible states of an account
 */
export type AccountStatus = "ACTIVE" | "PENDING" | "SUSPENDED" | "DELETED";

/**
 * Account Status Constants
 */
export const ACCOUNT_STATUS = {
  ACTIVE: "ACTIVE",
  PENDING: "PENDING",
  SUSPENDED: "SUSPENDED",
  DELETED: "DELETED"
} as const;

/**
 * Domain Entity: Account
 * Represents a user account in the domain
 */
export interface Account {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly status?: PrismaAccountStatus;
  readonly roleId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date | null;
}

export type AccountWithoutPassword = Omit<
  Account,
  "passwordHash" | "roleId"
> & {
  role: Role;
};

export interface CreateAccountData extends Omit<SignUpDTO, "password"> {
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
