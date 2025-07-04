import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./import-category.useCase";

export class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  handle(request: Request, response: Response) {
    const { file } = request;

    if (!file) return response.status(400).json({ error: "File not found" });

    this.importCategoryUseCase.execute(file);

    return response.send();
  }
}
