export interface DeleteAccountDTO {
  readonly accountId: string;
  readonly actor: {
    readonly id: string;
  };
}
