import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/Ispecifications.repository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO) {
    const specification = this.repository.create({ name, description });

    const result = await this.repository.save(specification);

    return result;
  }

  async findByName(name: string) {
    const specification = await this.repository.findOne({ name });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findByIds(ids);
  }
}
