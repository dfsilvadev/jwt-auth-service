import type { SessionAccount } from "./account.interface";

export interface HttpControllerRequest<
  TBody = unknown,
  TQuery = unknown,
  TParams = unknown
> {
  body: TBody;
  metadata?: {
    accountId?: string;
    sessionId?: string;
    [key: string]: unknown;
  };
  params: TParams;
  query: TQuery;
  account?: SessionAccount;
}

export interface HttpMiddlewareRequest {
  headers: Record<string, string | string[]>;
}

export interface HttpResponse<TBody = unknown> {
  statusCode: number;
  body: TBody | null;
}
