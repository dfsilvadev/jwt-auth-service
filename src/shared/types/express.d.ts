/* eslint-disable no-unused-vars */

declare global {
  namespace Express {
    interface Request {
      metadata?: {
        accountId?: string;
        sessionId?: string;
        [key: string]: unknown;
      };
    }
  }
}

export {};
