/* eslint-disable no-unused-vars */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
    public readonly details?: unknown,
    public readonly expose: boolean = true
  ) {
    super(message);
    this.name = new.target.name;
  }
}
