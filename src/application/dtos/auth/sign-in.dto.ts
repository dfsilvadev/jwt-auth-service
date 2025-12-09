/**
 * Sign In DTO
 * Data Transfer Object for sign in use case
 */
export interface SignInDTO {
  readonly email: string;
  readonly password: string;
}

export interface SignInResult {
  readonly accessToken: string;
  readonly expiresIn: number;
}
