/**
 * Password Hasher Service Interface
 * Domain contract for password hashing operations
 */
export interface PasswordHasher {
  hash(_password: string): Promise<string>;
  compare(_password: string, _hash: string): Promise<boolean>;
}
