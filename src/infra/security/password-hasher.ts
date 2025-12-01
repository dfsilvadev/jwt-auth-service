import bcrypt from "bcryptjs";

import { env } from "../../server/config/env/env";
import { logger } from "../logger";

export class PasswordHasher {
  private readonly saltRounds: number;

  constructor(saltRounds?: number) {
    this.saltRounds = saltRounds ?? env.PASSWORD_SALT_ROUNDS;
  }

  /**
   * Generate a hash for a given password
   * @param password - Plain text password
   * @returns Promise with the hashed password
   */
  async hash(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, this.saltRounds);
      logger.debug("[PasswordHasher] Password hashed successfully");
      return hashedPassword;
    } catch (error) {
      logger.error("[PasswordHasher] Error hashing password:", error);
      throw new Error("Failed to hash password");
    }
  }

  /**
   * Compare a plain text password with a stored hash
   * @param password - Plain text password
   * @param hash - Hash to compare against
   * @returns Promise<boolean> - true if they match, false otherwise
   */
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

  /**
   * Verify if a given string looks like a bcrypt hash
   * @param value - String to check
   * @returns true if the string is a bcrypt hash, false otherwise
   */
  isHash(value: string): boolean {
    return /^\$2[abxy]\$\d{2}\$.{53}$/.test(value);
  }
}

/**
 * Instance of PasswordHasher with default configuration
 */
export const passwordHasher = new PasswordHasher();
