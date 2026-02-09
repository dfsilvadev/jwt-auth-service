/**
 * Sign Up DTO
 * Data Transfer Object for sign up use case
 */
export interface SignUpDTO {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly roleId?: string;
}
