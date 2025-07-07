import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/Ispecifications-repository";
import { AppError } from "../../../../errors/app-error";

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

  async execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists!");
    }

    await this.specificationsRepository.create({ name, description });
  }
}
