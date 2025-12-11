export interface DeleteAccountDto {
  readonly accountId: string;
  readonly actor: {
    readonly id: string;
  };
}
