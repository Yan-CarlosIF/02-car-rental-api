import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./create-category.useCase";

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.execute({ name, description });

    return response.status(201).send();
  }
}
