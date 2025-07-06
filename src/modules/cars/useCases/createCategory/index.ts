import { CategoriesRepository } from "../../repositories/implementations/categories.repository";
import { CreateCategoryUseCase } from "./create-categor.useCase";
import { CreateCategoryController } from "./create-category.controller";

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  return createCategoryController;
};
