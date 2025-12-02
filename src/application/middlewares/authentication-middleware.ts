import { TokenService } from "../services/auth/token-service";

import { ERROR_MESSAGES } from "../http/exceptions/constants/error-messages";
import { InvalidTokenError } from "../http/exceptions/invalid-token-error";
import { UnauthorizedError } from "../http/exceptions/unauthorized-error";

import type {
  HttpMiddlewareRequest,
  HttpResponse
} from "../../domain/entities/httpProtocol.interface";
import type {
  Middleware,
  MiddlewareDataResponse
} from "../../domain/entities/middleware.interface";

export class AuthenticationMiddleware implements Middleware {
  constructor(private readonly _tokenService: TokenService) {}

  async handle(
    _request: HttpMiddlewareRequest
  ): Promise<HttpResponse | MiddlewareDataResponse> {
    const token = this.extractBearerToken(_request.headers?.authorization);
    const payload = this._tokenService.verifyAccessToken(token);

    return {
      data: {
        account: {
          id: payload.sub,
          sessionId: payload.sessionId
        }
      }
    };
  }

  private extractBearerToken(headerValue?: string | string[]): string {
    const authorization = Array.isArray(headerValue)
      ? headerValue[0]
      : headerValue;

    if (!authorization)
      throw new UnauthorizedError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED);

    const parts = authorization.trim().split(/\s+/);
    const [scheme, token, ...rest] = parts;

    if (scheme !== "Bearer")
      throw new InvalidTokenError(ERROR_MESSAGES.INVALID_TOKEN_FORMAT);

    if (!token)
      throw new UnauthorizedError(ERROR_MESSAGES.AUTHENTICATION_TOKEN_REQUIRED);

    if (rest.length > 0)
      throw new InvalidTokenError(ERROR_MESSAGES.INVALID_TOKEN_FORMAT);

    return token;
  }
}
