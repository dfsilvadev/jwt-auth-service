import type {
  HttpMiddlewareRequest,
  MiddlewareDataResponse
} from "../../types/http.types";

export interface Middleware {
  handle(_request: HttpMiddlewareRequest): Promise<MiddlewareDataResponse>;
}
