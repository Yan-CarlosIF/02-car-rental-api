import { ICategoriesRepository } from "../../repositories/Icategories-repository";

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute() {
    return this.categoriesRepository.list();
  }
}
