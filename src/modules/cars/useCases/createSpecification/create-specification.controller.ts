import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEspecificationUseCase } from "./create-specification.useCase";

export class CreateSpecificationController {
  handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateEspecificationUseCase
    );

    createSpecificationUseCase.execute({ name, description });

    return response.status(201).send();
  }
}
