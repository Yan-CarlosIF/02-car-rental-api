import { CategoriesRepository } from "../../repositories/implementations/categories.repository";
import { CreateCategoryUseCase } from "./create-categor.useCase";
import { CreateCategoryController } from "./create-category.controller";

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

export const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);
