import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileUserUseCase } from "./profile-user.useCase";

export class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const profileUserUseCase = container.resolve(ProfileUserUseCase);

    const user = await profileUserUseCase.execute(id);

    return response.json(user);
  }
}
