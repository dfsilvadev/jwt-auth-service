/* eslint-disable no-unused-vars */

import type { Account } from "../domain/entities/account.interface";

declare global {
  namespace Express {
    interface Request {
      metadata?: {
        account?: Account;
      };
    }
  }
}

export {};
