import { CategoriesRepository } from "../../repositories/implementations/categories.repository";
import { ImportCategoryController } from "./import-category.controller";
import { ImportCategoryUseCase } from "./import-category.useCase";

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

export const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);
