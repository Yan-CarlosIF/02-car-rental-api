import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgottenPasswordMailUseCase } from "./send-forgotten-password-mail.useCase";

export class SendForgottenPasswordMailController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    const sendForgottenPasswordMailUseCase = container.resolve(
      SendForgottenPasswordMailUseCase
    );

    await sendForgottenPasswordMailUseCase.execute(email);

    return response.status(200).send();
  }
}
