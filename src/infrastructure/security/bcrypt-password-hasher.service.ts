import bcrypt from "bcryptjs";

import type { PasswordHasher } from "../../domain/services/password-hasher.service";

import { logger } from "../logger";

/**
 * Bcrypt Password Hasher Implementation
 * Implements PasswordHasher interface using bcryptjs
 */
export class BcryptPasswordHasher implements PasswordHasher {
  constructor(private readonly _saltRounds: number) {}

  async hash(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, this._saltRounds);
      logger.debug("[PasswordHasher] Password hashed successfully");
      return hashedPassword;
    } catch (error) {
      logger.error("[PasswordHasher] Error hashing password:", error);
      throw new Error("Failed to hash password");
    }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      logger.debug("[PasswordHasher] Password comparison completed");
      return isMatch;
    } catch (error) {
      logger.error("[PasswordHasher] Error comparing password:", error);
      return false;
    }
  }
}
