import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.useCase";
import { container } from "tsyringe";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { name, password, email, driver_license } = request.body;

    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license,
    });

    return response.status(201).send();
  }
}
