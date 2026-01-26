/**
 * Token Service Interface
 * Domain contract for token generation and verification
 */
export interface TokenPayload {
  readonly account: {
    id: string;
    role: string;
  };
  readonly sessionId: string;
}

export interface Token {
  readonly value: string;
  readonly expiresIn: number;
}

export interface TokenService {
  generate(_payload: TokenPayload): Token;
  verify(_token: string): TokenPayload;
}
