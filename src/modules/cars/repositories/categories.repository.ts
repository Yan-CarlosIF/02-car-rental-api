import { Category } from "../models/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./Icategories-repository";

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance() {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
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
