import { Category } from "../models/Category";

// DTO => Data transfer object
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO) {
    const newCategory = new Category(name, description);

    this.categories.push(newCategory);
  }

  findByName(name: string) {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }

  get list() {
    return this.categories;
  }
}
