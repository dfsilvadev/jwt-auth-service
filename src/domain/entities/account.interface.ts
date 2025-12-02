import type { Account as PrismaAccount } from "../../generated";

export type Account = Omit<PrismaAccount, "passwordHash">;

export interface SessionAccount {
  id: string;
  sessionId: string;
}
