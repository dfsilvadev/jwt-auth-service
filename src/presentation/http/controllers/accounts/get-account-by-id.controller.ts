import { GetAccountByIdUseCase } from "../../../../application/use-cases/accounts/get-account-by-id.use-case";

import { toHttpResponse } from "../../errors";
import { HTTP_SUCCESS_STATUS } from "../../utils/constants/success-messages";

import { getAccountValidator } from "../../validators/get-account.validator";

import type { AccountParams } from "../../../../domain/entities/account.entity";
import type { Controller } from "../../../../domain/entities/controller.interface";
import type { HttpRequest, HttpResponse } from "../../types/http.types";

/**
 * Get Account By ID Controller
 * Handles HTTP requests for retrieving an account by its ID
 */

export class GetAccountByIdController implements Controller {
  constructor(private readonly _getAccountByIdUseCase: GetAccountByIdUseCase) {}

  async handle(
    request: HttpRequest<unknown, unknown, AccountParams>
  ): Promise<HttpResponse> {
    try {
      const { accountId } = getAccountValidator.parse(request.params);

      const result = await this._getAccountByIdUseCase.execute({
        accountId: accountId
      });

      return {
        statusCode: HTTP_SUCCESS_STATUS.OK,
        body: result
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
