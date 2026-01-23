import type { TokenService } from "../../../domain/services/token.service";

import { InvalidTokenError, UnauthorizedError } from "../errors";
import { ERROR_MESSAGES } from "../errors/constants/error-messages";

import type {
  HttpMiddlewareRequest,
  MiddlewareDataResponse
} from "../types/http.types";

export interface Middleware {
  handle(_request: HttpMiddlewareRequest): Promise<MiddlewareDataResponse>;
}

export class AuthenticationMiddleware implements Middleware {
  constructor(private readonly _tokenService: TokenService) {}

  async handle(
    request: HttpMiddlewareRequest
  ): Promise<MiddlewareDataResponse> {
    const token = this.extractBearerToken(request.headers?.authorization);
    const payload = this._tokenService.verify(token);

    return {
      data: {
        accountId: payload.accountId,
        sessionId: payload.sessionId,
        role: payload.role
      }
    };
  }

  private extractBearerToken(headerValue?: string | string[]): string {
    const authorization = Array.isArray(headerValue)
      ? headerValue[0]
      : headerValue;

    if (!authorization) {
      throw new UnauthorizedError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED);
    }

    const parts = authorization.trim().split(/\s+/);
    const [scheme, token, ...rest] = parts;

    if (scheme !== "Bearer") {
      throw new InvalidTokenError(ERROR_MESSAGES.INVALID_TOKEN_FORMAT);
    }

    if (!token) {
      throw new UnauthorizedError(ERROR_MESSAGES.AUTHENTICATION_TOKEN_REQUIRED);
    }

    if (rest.length > 0) {
      throw new InvalidTokenError(ERROR_MESSAGES.INVALID_TOKEN_FORMAT);
    }

    return token;
  }
}
