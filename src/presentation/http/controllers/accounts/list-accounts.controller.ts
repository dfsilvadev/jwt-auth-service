import { ListAccountsUseCase } from "../../../../application/use-cases/accounts/list-accounts.use-case";

import { toHttpResponse } from "../../errors/http-error.mapper";
import { HTTP_SUCCESS_STATUS } from "../../utils/constants/success-messages";

import type { AccountFilters } from "../../../../domain/entities/account.entity";
import type { Controller } from "../../../../domain/entities/controller.interface";
import type { HttpRequest, HttpResponse } from "../../types/http.types";

export class ListAccountsController implements Controller {
  constructor(private readonly _listAccountsUseCase: ListAccountsUseCase) {}

  async handle(
    request: HttpRequest<unknown, AccountFilters>
  ): Promise<HttpResponse> {
    try {
      const result = await this._listAccountsUseCase.execute({
        status: request.query.status
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
