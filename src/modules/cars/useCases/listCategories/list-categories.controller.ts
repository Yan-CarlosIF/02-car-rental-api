import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./list-categories.useCase";

export class ListCategoriesController {
  async handle(request: Request, response: Response) {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const categories = await listCategoriesUseCase.execute();

    return response.json(categories);
  }
}
