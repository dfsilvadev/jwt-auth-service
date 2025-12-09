/**
 * List Accounts DTO
 * Data Transfer Object for list accounts use case
 */
export interface ListAccountsDTO {
  readonly status?: string;
}

export interface ListAccountsResult {
  readonly accounts: Array<{
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  }>;
}
