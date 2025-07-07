import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./update-user-avatar.useCase";

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    // Receber Arquivo
    const avatar_file = request.file?.filename as string;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file,
    });

    return response.status(204).send();
  }
}
