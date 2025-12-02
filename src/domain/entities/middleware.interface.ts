import type {
  HttpMiddlewareRequest,
  HttpResponse
} from "./httpProtocol.interface";

export interface MiddlewareDataResponse {
  data: Record<string, any>;
}

export interface Middleware {
  handle(
    _request: HttpMiddlewareRequest
  ): Promise<HttpResponse | MiddlewareDataResponse>;
}
