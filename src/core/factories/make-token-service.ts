import { env } from "../../application/config/env/env";

import { TokenService } from "../../application/services/auth/token-service";

export function makeTokenService() {
  const SECRET = env.JWT_SECRET;
  const ISSUER = env.JWT_ISSUER;
  const ACCESS_TOKEN_TTL_SECONDS = env.ACCESS_TOKEN_TTL;

  return new TokenService(SECRET, ISSUER, ACCESS_TOKEN_TTL_SECONDS);
}
