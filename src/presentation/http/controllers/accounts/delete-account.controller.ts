import { DeleteAccountUseCase } from "../../../../application/use-cases/accounts/delete-account.use-case";

import { toHttpResponse } from "../../errors";
import {
  HTTP_SUCCESS_STATUS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../utils/constants/success-messages";

import { deleteAccountValidator } from "../../validators/delete-account.validator";

import { ForbiddenError } from "../../../../domain/errors/forbidden-error";

import type { Controller } from "../../../../domain/entities/controller.interface";
import type { HttpRequest, HttpResponse } from "../../types/http.types";

/**
 * Delete Account Controller
 * Handles HTTP requests for deleting an account
 */

export class DeleteAccountController implements Controller {
  constructor(private readonly _deleteAccountUseCase: DeleteAccountUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.metadata?.accountId) throw new ForbiddenError();

      const { accountId } = deleteAccountValidator.parse(request.params);

      await this._deleteAccountUseCase.execute({
        accountId,
        actor: {
          id: request.metadata.accountId
        }
      });

      return {
        statusCode: HTTP_SUCCESS_STATUS.OK,
        body: {
          code: SUCCESS_CODES.RESOURCE_DELETED,
          message: SUCCESS_MESSAGES.RESOURCE_DELETED
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
