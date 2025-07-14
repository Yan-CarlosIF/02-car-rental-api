import { ICarsRepository } from "@modules/cars/repositories/Icars.repository";
import { IRentalsRepository } from "@modules/rentals/repositories/Irentals.repository";
import { IDateProvider } from "@shared/conteiner/providers/dateProvider/Idate-provider";
import { AppError } from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental does not exists!");
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new AppError("Car does not exists!");
    }

    const minimumDaily = 1;

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);

    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}
