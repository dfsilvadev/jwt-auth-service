import { Controller } from "../../../../domain/entities/controller.interface";

import { ListAccountsUseCase } from "../../../use-cases/accounts/list-accounts.use-case";

import { toHttpResponse } from "../../exceptions/utils/http-error-mapper";
import { HTTP_SUCCESS_STATUS } from "../../utils/constants/success-messages";

import { listAccountsSchema } from "../../schema/list-accounts.schema";

import type {
  HttpControllerRequest,
  HttpResponse
} from "../../../../domain/entities/httpProtocol.interface";
import type { AccountStatus } from "../../../../generated";

interface ListAccountsQuery {
  status?: AccountStatus;
}

export class ListAccountsController implements Controller {
  constructor(private readonly _listAccountsUseCase: ListAccountsUseCase) {}

  async handle({
    query
  }: HttpControllerRequest<
    unknown,
    ListAccountsQuery,
    unknown
  >): Promise<HttpResponse> {
    try {
      const { status } = listAccountsSchema.parse(query);

      const accounts = await this._listAccountsUseCase.execute({ status });

      return {
        statusCode: HTTP_SUCCESS_STATUS.OK,
        body: { accounts }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
