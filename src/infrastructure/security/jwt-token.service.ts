import { type JwtPayload, sign, verify } from "jsonwebtoken";

import type {
  Token,
  TokenPayload,
  TokenService
} from "../../domain/services/token.service";

import { ERROR_MESSAGES } from "../../presentation/http/errors/constants/error-messages";
import { InvalidTokenError } from "../../presentation/http/errors/invalid-token.error";

/**
 * JWT Token Service Implementation
 * Implements TokenService interface using jsonwebtoken
 */
export class JwtTokenService implements TokenService {
  constructor(
    private readonly _secret: string,
    private readonly _issuer: string,
    private readonly _expiresInSeconds: number
  ) {}

  generate(payload: TokenPayload): Token {
    const token = sign(
      {
        sub: payload.accountId,
        sessionId: payload.sessionId
      },
      this._secret,
      {
        issuer: this._issuer,
        expiresIn: this._expiresInSeconds
      }
    );

    return {
      value: token,
      expiresIn: this._expiresInSeconds
    };
  }

  verify(token: string): TokenPayload {
    try {
      const payload = verify(token, this._secret, {
        issuer: this._issuer
      }) as JwtPayload & {
        sub: string;
        sessionId: string;
      };

      if (!payload.sub || !payload.sessionId) {
        throw new InvalidTokenError(ERROR_MESSAGES.INVALID_TOKEN_PAYLOAD);
      }

      return {
        accountId: payload.sub,
        sessionId: payload.sessionId
      };
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        throw error;
      }

      throw new InvalidTokenError(ERROR_MESSAGES.INVALID_TOKEN);
    }
  }
}
