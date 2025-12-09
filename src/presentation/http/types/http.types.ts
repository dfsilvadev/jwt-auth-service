/**
 * HTTP Types for Presentation Layer
 */
export interface HttpRequest<
  TBody = unknown,
  TQuery = unknown,
  TParams = unknown
> {
  body: TBody;
  params: TParams;
  query: TQuery;
  metadata?: {
    accountId?: string;
    sessionId?: string;
    [key: string]: unknown;
  };
}

export interface HttpResponse<TBody = unknown> {
  statusCode: number;
  body: TBody | null;
}

export interface HttpMiddlewareRequest {
  headers: Record<string, string | string[]>;
}

export interface MiddlewareDataResponse {
  data: Record<string, unknown>;
}
