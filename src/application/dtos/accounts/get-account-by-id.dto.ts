export interface GetAccountByIdDTO {
  readonly accountId: string;
}

export interface GetAccountByIdResult {
  readonly account: {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  };
}
