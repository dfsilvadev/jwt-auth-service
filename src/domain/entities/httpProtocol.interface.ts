import type { Account } from "./account.interface";

export interface HttpControllerRequest {
  body: Record<string, any>;
  metadata?: Record<string, any>;
  params?: Record<string, string>;
  query?: Record<string, any>;
  account?: Account;
}

export interface HttpMiddlewareRequest {
  headers: Record<string, string | string[]>;
}

export interface HttpResponse {
  statusCode: number;
  body: Record<string, any> | null;
}
