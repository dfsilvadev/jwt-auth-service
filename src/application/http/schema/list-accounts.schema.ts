import z from "zod";

import { AccountStatus } from "../../../generated";

export const listAccountsSchema = z.object({
  status: z.enum([
    AccountStatus.ACTIVE,
    AccountStatus.DELETED,
    AccountStatus.PENDING,
    AccountStatus.SUSPENDED
  ])
});

export type ListAccountsSchema = z.infer<typeof listAccountsSchema>;
