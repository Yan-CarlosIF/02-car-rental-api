import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/cars-in-memory.repository";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/rentals-in-memory.repository";
import { DayjsDateProvider } from "@shared/conteiner/providers/dateProvider/implementations/dayjs-date-provider";
import { AppError } from "@shared/errors/app-error";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./create-rental.useCase";

const carExample = {
  name: "Car Test",
  description: "Car description Test",
  daily_rate: 100,
  license_plate: "ABC-1234",
  fine_amount: 60,
  brand: "Brand Test",
  category_id: "1234",
};

describe("Create Rental", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let dayjsDateProvider: DayjsDateProvider;
  let dayAdd24Hours: Date;

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayAdd24Hours = dayjs().add(1, "day").toDate();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create(carExample);

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "121212",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    const car = await carsRepositoryInMemory.create(carExample);

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "121212",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "12345",
        user_id: "121212",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    const car = await carsRepositoryInMemory.create(carExample);

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "1",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: "121212",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with an expected return date less than 24 hours", async () => {
    const car = await carsRepositoryInMemory.create(carExample);

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: "121212",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
