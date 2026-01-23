import { type JwtPayload, verify as jwtVerify, sign } from "jsonwebtoken";

import { InvalidTokenError } from "../../domain/errors/invalid-token.error";
import type {
  Token,
  TokenPayload,
  TokenService
} from "../../domain/services/token.service";

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
        account: {
          sub: payload.accountId,
          role: payload.role
        },
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
      const payload = jwtVerify(token, this._secret, {
        issuer: this._issuer
      }) as JwtPayload & {
        sub: string;
        sessionId: string;
      };

      if (!payload.account.sub || !payload.sessionId) {
        throw new InvalidTokenError(
          "Your session information is incomplete. Please log in again"
        );
      }

      return {
        accountId: payload.account.sub,
        role: payload.account.role,
        sessionId: payload.sessionId
      };
    } catch (error) {
      if (error instanceof InvalidTokenError) throw error;

      throw new InvalidTokenError();
    }
  }
}
