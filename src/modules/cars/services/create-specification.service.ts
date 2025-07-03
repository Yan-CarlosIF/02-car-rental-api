import { ISpecificationsRepository } from "../repositories/Ispecifications-repository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateEspecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.specificationsRepository.create({ name, description });
  }
}
