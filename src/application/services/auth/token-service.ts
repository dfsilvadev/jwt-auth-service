import { type JwtPayload, sign, verify } from "jsonwebtoken";

import { ERROR_MESSAGES } from "../../http/exceptions/constants/error-messages";
import { InvalidTokenError } from "../../http/exceptions/invalid-token-error";

export interface AccessTokenPayload extends JwtPayload {
  sub: string;
  sessionId: string;
}

interface GenerateAccessTokenParams {
  accountId: string;
  sessionId: string;
}

export class TokenService {
  constructor(
    private readonly _secret: string,
    private readonly _issuer: string,
    private readonly _accessTokenTtlSeconds: number
  ) {}

  generateAccessToken({ accountId, sessionId }: GenerateAccessTokenParams): {
    token: string;
    expiresIn: number;
  } {
    const token = sign(
      {
        sub: accountId,
        sessionId
      },
      this._secret,
      {
        issuer: this._issuer,
        expiresIn: this._accessTokenTtlSeconds
      }
    );

    return { token, expiresIn: this._accessTokenTtlSeconds };
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    try {
      const payload = verify(token, this._secret, {
        issuer: this._issuer
      }) as AccessTokenPayload;

      if (!payload.sub || !payload.sessionId)
        throw new InvalidTokenError(ERROR_MESSAGES.INVALID_TOKEN_PAYLOAD);

      return payload;
    } catch (error) {
      if (error instanceof InvalidTokenError) throw error;

      throw new InvalidTokenError(ERROR_MESSAGES.INVALID_TOKEN);
    }
  }
}
