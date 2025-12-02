/* eslint-disable no-unused-vars */

import type { SessionAccount } from "../domain/entities/account.interface";

declare global {
  namespace Express {
    interface Request {
      metadata?: {
        account?: SessionAccount;
      };
    }
  }
}

export {};
