import { ICreateCarDTO } from "@modules/cars/dtos/Icreate-car.dto";
import { ICarsRepository } from "@modules/cars/repositories/Icars.repository";
import { AppError } from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";

// @injectable()
export class CreateCarUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO) {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    const car = await this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return car;
  }
}
