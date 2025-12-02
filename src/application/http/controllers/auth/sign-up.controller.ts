import { SignUpUseCase } from "../../../use-cases/auth/sign-up.use-case";

import { toHttpResponse } from "../../exceptions/utils/http-error-mapper";

import { signUpSchema } from "../../schema/sign-up.schema";

import {
  HTTP_SUCCESS_STATUS,
  SUCCESS_CODES
} from "../../utils/constants/success-messages";

import type { Controller } from "../../../../domain/entities/controller.interface";
import type {
  HttpControllerRequest,
  HttpResponse
} from "../../../../domain/entities/httpProtocol.interface";

export class SignUpController implements Controller {
  constructor(private readonly _signUpUseCase: SignUpUseCase) {}

  async handle({ body }: HttpControllerRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = signUpSchema.parse(body);
      const account = await this._signUpUseCase.execute({
        name,
        email,
        password
      });

      return {
        statusCode: HTTP_SUCCESS_STATUS.CREATED,
        body: {
          code: SUCCESS_CODES.ACCOUNT_CREATED,
          account
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
