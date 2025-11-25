import { sign } from "jsonwebtoken";

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
}
