import { UpdateAccountUseCase } from "../../../../application/use-cases/accounts/update-account.use-case";

import { ForbiddenError } from "../../../../domain/errors/forbidden-error";
import { toHttpResponse } from "../../errors";
import {
  HTTP_SUCCESS_STATUS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../utils/constants/success-messages";

import {
  updateAccountBodyValidator,
  updateAccountIdValidator
} from "../../validators/update-account.validator";

import type { Controller } from "../../../../domain/entities/controller.interface";
import type { HttpRequest, HttpResponse } from "../../types/http.types";

/**
 * Update Account Controller
 * Handles HTTP requests for updating an account
 */

export class UpdateAccountController implements Controller {
  constructor(private readonly _updateAccountUseCase: UpdateAccountUseCase) {}

  async handle(
    request: HttpRequest<unknown, unknown, unknown>
  ): Promise<HttpResponse> {
    try {
      const { accountId } = updateAccountIdValidator.parse(request.params);
      const validatedData = updateAccountBodyValidator.parse(request.body);

      const authenticatedAccountId = request.metadata?.accountId;
      if (authenticatedAccountId !== accountId)
        throw new ForbiddenError("You can only update your own account");

      await this._updateAccountUseCase.execute({
        accountId,
        body: validatedData
      });

      return {
        statusCode: HTTP_SUCCESS_STATUS.OK,
        body: {
          code: SUCCESS_CODES.RESOURCE_UPDATED,
          message: SUCCESS_MESSAGES.RESOURCE_UPDATED
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
