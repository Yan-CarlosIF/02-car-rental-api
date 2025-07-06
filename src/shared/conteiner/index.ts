import { container } from "tsyringe";
import { ICategoriesRepository } from "../../modules/cars/repositories/Icategories-repository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/categories.repository";

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);
