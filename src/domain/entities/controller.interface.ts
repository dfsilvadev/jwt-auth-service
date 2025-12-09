import type {
  HttpRequest,
  HttpResponse
} from "../../presentation/http/types/http.types";

export interface Controller {
  handle(_request: HttpRequest): Promise<HttpResponse>;
}
