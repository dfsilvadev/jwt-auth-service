import { SignInUseCase } from "../../../../application/use-cases/auth/sign-in.use-case";

import { toHttpResponse } from "../../errors/http-error.mapper";
import { HTTP_SUCCESS_STATUS } from "../../utils/constants/success-messages";
import { signInValidator } from "../../validators/sign-in.validator";

import type { Controller } from "../../../../domain/entities/controller.interface";
import type { HttpRequest, HttpResponse } from "../../types/http.types";

export class SignInController implements Controller {
  constructor(private readonly _signInUseCase: SignInUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const dto = signInValidator.parse(request.body);
      const result = await this._signInUseCase.execute(dto);

      return {
        statusCode: HTTP_SUCCESS_STATUS.OK,
        body: result
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
