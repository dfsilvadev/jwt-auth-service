import { SignUpUseCase } from "../../../../application/use-cases/auth/sign-up.use-case";

import { toHttpResponse } from "../../errors/http-error.mapper";
import {
  HTTP_SUCCESS_STATUS,
  SUCCESS_CODES
} from "../../utils/constants/success-messages";
import { signUpValidator } from "../../validators/sign-up.validator";

import type { Controller } from "../../../../domain/entities/controller.interface";
import type { HttpRequest, HttpResponse } from "../../types/http.types";

export class SignUpController implements Controller {
  constructor(private readonly _signUpUseCase: SignUpUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const dto = signUpValidator.parse(request.body);
      await this._signUpUseCase.execute(dto);

      return {
        statusCode: HTTP_SUCCESS_STATUS.CREATED,
        body: {
          code: SUCCESS_CODES.ACCOUNT_CREATED,
          message: "Account created successfully"
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
