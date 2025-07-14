import { inject, injectable } from "tsyringe";
import { ICreateRentalDTO } from "@modules/rentals/dtos/Icreate-rental.dto";
import { IRentalsRepository } from "@modules/rentals/repositories/Irentals.repository";
import { IDateProvider } from "@shared/conteiner/providers/dateProvider/Idate-provider";
import { AppError } from "@shared/errors/app-error";
import { ICarsRepository } from "@modules/cars/repositories/Icars.repository";

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, user_id, expected_return_date }: ICreateRentalDTO) {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    const minimumHour = 24;
    if (compare < minimumHour) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);
    
    return rental;
  }
}
