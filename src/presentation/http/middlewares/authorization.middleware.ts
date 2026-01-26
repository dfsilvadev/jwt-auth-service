import { ForbiddenError } from "../../../domain/errors";

import {
  HttpMiddlewareRequest,
  MiddlewareDataResponse
} from "../types/http.types";
import type { Middleware } from "./dtos/middlewares.dto";

export class AuthorizationMiddleware implements Middleware {
  constructor(private readonly _allowedRoles: string[]) {}
  async handle(
    request: HttpMiddlewareRequest
  ): Promise<MiddlewareDataResponse> {
    const { metadata } = request;

    if (!metadata) throw new ForbiddenError();

    if (!this._allowedRoles.includes(metadata.account?.role as string))
      throw new ForbiddenError();

    return {
      data: metadata
    };
  }
}
