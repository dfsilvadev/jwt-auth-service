import { env } from "../../presentation/server/config/env/env";
import { JwtTokenService } from "../security/jwt-token.service";

export function makeTokenService() {
  return new JwtTokenService(
    env.JWT_SECRET,
    env.JWT_ISSUER,
    env.ACCESS_TOKEN_TTL
  );
}
