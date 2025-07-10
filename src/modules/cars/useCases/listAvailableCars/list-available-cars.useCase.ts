import { ICarsRepository } from "@modules/cars/repositories/Icars.repository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ category_id, brand, name }: IRequest) {
    return await this.carsRepository.findAvailable({
      category_id,
      brand,
      name,
    });
  }
}
