export interface HttpControllerRequest {
  body: Record<string, any>;
}

export interface HttpMiddlewareRequest {
  headers: Record<string, string | string[]>;
}

export interface HttpResponse {
  statusCode: number;
  body: Record<string, any> | null;
}
