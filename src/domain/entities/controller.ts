import { type HttpRequest } from "./request";
import { type HttpResponse } from "./response";

export interface Controller {
  handle(_request: HttpRequest): Promise<HttpResponse>;
}
