import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/Icategories-repository";

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO) {
    const newCategory = this.repository.create({ name, description });

    await this.repository.save(newCategory);
  }

  async findByName(name: string) {
    const category = await this.repository.findOne({ name });

    return category;
  }

  async list() {
    const categories = await this.repository.find();
    return categories;
  }
}
