import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./import-category.useCase";

export class ImportCategoryController {
  async handle(request: Request, response: Response) {
    const { file } = request;

    if (!file) return response.status(400).json({ error: "File not found" });

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    await importCategoryUseCase.execute(file);

    return response.status(201).send();
  }
}
