import { GetRolesPermissionsUseCase } from "../../../application/use-cases/roles/get-roles-permissions.use-case";

import { ForbiddenError } from "../../../domain/errors";

import {
  HttpMiddlewareRequest,
  MiddlewareDataResponse
} from "../types/http.types";
import type { Middleware } from "./dtos/middlewares.dto";

export class AuthorizationMiddleware implements Middleware {
  constructor(
    private readonly _requiredPermissions: string[],
    private readonly _getRolesPermissionsUseCase: GetRolesPermissionsUseCase
  ) {}
  async handle(
    request: HttpMiddlewareRequest
  ): Promise<MiddlewareDataResponse> {
    const { metadata } = request;

    if (!metadata) throw new ForbiddenError();

    const permissions = await this._getRolesPermissionsUseCase.execute(
      metadata.account?.role as string
    );

    const isAllowed = this._requiredPermissions.some((code) =>
      permissions.includes(code)
    );

    if (!isAllowed) throw new ForbiddenError();

    return {
      data: metadata
    };
  }
}
