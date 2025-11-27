import { SignInUseCase } from "../../../use-cases/auth/sign-in-use-case";

import { toHttpResponse } from "../../exceptions/utils/http-error-mapper";

import { signUpSchema } from "../../schema/sign-up";

import { HTTP_SUCCESS_STATUS } from "../../util/constants/success-messages";

import { type Controller } from "../../../../core/entities/controller";
import { type HttpRequest } from "../../../../core/entities/request";
import { type HttpResponse } from "../../../../core/entities/response";

export class SignInController implements Controller {
  constructor(private readonly _signInUseCase: SignInUseCase) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = signUpSchema.parse(body);

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
