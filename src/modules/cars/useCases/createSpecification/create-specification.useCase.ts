import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/Ispecifications-repository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateEspecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.specificationsRepository.create({ name, description });
  }
}
