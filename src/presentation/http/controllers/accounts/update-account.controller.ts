import { UpdateAccountUseCase } from "../../../../application/use-cases/accounts/update-account.use-case";
import { toHttpResponse, UnauthorizedError } from "../../errors";
import { HTTP_SUCCESS_STATUS } from "../../utils/constants/success-messages";
import {
  updateAccountBodyValidator,
  updateAccountIdValidator
} from "../../validators/update-account.validator";

import type { Controller } from "../../../../domain/entities/controller.interface";
import type { HttpRequest, HttpResponse } from "../../types/http.types";

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
        throw new UnauthorizedError("You can only update your own account");

      const updated = await this._updateAccountUseCase.execute({
        accountId,
        body: validatedData
      });

      return {
        statusCode: HTTP_SUCCESS_STATUS.OK,
        body: updated
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
