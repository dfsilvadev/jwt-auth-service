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
    account?: {
      id: string;
      role: string;
    };
    sessionId?: string;
    [key: string]: unknown;
  };
}

export interface HttpMiddlewareRequest extends HttpRequest {
  headers: Record<string, string | string[]>;
}

export interface HttpResponse<TBody = unknown> {
  statusCode: number;
  body: TBody | null;
}

export interface MiddlewareDataResponse {
  data: Record<string, unknown>;
}
