import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../Icategories-repository";

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  // private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Category);
  }

  // public static getInstance() {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }

  //   return CategoriesRepository.INSTANCE;
  // }

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
