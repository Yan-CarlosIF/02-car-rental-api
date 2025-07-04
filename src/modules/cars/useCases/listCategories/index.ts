import { CategoriesRepository } from "../../repositories/implementations/categories.repository";
import { ListCategoriesController } from "./list-categories.controller";
import { ListCategoriesUseCase } from "./list-categories.useCase";

const categoriesRepository = CategoriesRepository.getInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

export const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);
