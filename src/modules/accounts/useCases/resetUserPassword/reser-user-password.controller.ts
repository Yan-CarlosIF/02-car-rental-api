import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetUserPasswordUseCase } from "./reset-user-password.useCase";

export class ResetUserPasswordController {
  async handle(request: Request, response: Response) {
    const { token: refresh_token } = request.query;
    const { password } = request.body;

    const resetUserPasswordUseCase = container.resolve(
      ResetUserPasswordUseCase
    );

    await resetUserPasswordUseCase.execute({
      token: String(refresh_token),
      password,
    });

    return response.send();
  }
}
