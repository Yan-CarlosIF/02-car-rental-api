import { CategoriesRepository } from "../../repositories/categories.repository";
import { CreateCategoryUseCase } from "./create-categor.useCase";
import { CreateCategoryController } from "./create-category.controller";

const categoriesRepository = new CategoriesRepository();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

export const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);
