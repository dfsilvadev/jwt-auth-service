import { SignInUseCase } from "../../../use-cases/auth/sign-in-use-case";

import { toHttpResponse } from "../../exceptions/utils/http-error-mapper";

import { signInSchema } from "../../schema/sign-in";

import { HTTP_SUCCESS_STATUS } from "../../utils/constants/success-messages";

import type { Controller } from "../../../../domain/entities/controller.interface";
import type {
  HttpControllerRequest,
  HttpResponse
} from "../../../../domain/entities/httpProtocol.interface";

export class SignInController implements Controller {
  constructor(private readonly _signInUseCase: SignInUseCase) {}

  async handle({ body }: HttpControllerRequest): Promise<HttpResponse> {
    try {
      const { email, password } = signInSchema.parse(body);

      const { accessToken, expiresIn } = await this._signInUseCase.execute({
        email,
        password
      });

      return {
        statusCode: HTTP_SUCCESS_STATUS.OK,
        body: {
          accessToken,
          expiresIn
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
