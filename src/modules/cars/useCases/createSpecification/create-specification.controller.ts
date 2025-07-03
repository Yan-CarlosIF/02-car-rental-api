import { Request, Response } from "express";
import { CreateEspecificationUseCase } from "./create-specification.useCase";

export class CreateSpecificationController {
  constructor(
    private createSpecificationUseCase: CreateEspecificationUseCase
  ) {}

  handle(request: Request, response: Response) {
    const { name, description } = request.body;

    this.createSpecificationUseCase.execute({ name, description });

    return response.status(201).send();
  }
}
