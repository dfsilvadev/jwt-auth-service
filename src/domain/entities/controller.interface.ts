import type {
  HttpControllerRequest,
  HttpResponse
} from "./httpProtocol.interface";

export interface Controller {
  handle(_request: HttpControllerRequest): Promise<HttpResponse>;
}
