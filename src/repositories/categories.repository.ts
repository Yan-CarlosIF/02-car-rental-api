import { Category } from "../models/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
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

  list() {
    return this.categories;
  }
}
