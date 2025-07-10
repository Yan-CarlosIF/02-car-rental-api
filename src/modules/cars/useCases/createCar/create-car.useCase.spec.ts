import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/cars-in-memory.repository";
import { CreateCarUseCase } from "./create-car.useCase";
import { ICreateCarDTO } from "@modules/cars/dtos/Icreate-car.dto";
import { AppError } from "@shared/errors/app-error";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

describe("Create a Car", () => {
  let createCarUseCase: CreateCarUseCase;
  let carsRepository: CarsRepositoryInMemory;

  const car: ICreateCarDTO = {
    name: "Car Test",
    description: "Car description Test",
    daily_rate: 100,
    license_plate: "ABC-1234",
    fine_amount: 60,
    brand: "Brand Test",
    category_id: "category_id",
  };

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const createdCar = await createCarUseCase.execute({
      name: car.name,
      description: car.description,
      daily_rate: car.daily_rate,
      license_plate: car.license_plate,
      fine_amount: car.fine_amount,
      brand: car.brand,
      category_id: car.category_id,
    });

    expect(createdCar).toHaveProperty("id");
  });

  it("should not be able to create a car with an existing license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: car.name,
        description: car.description,
        daily_rate: car.daily_rate,
        license_plate: car.license_plate,
        fine_amount: car.fine_amount,
        brand: car.brand,
        category_id: car.category_id,
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: car.description,
        daily_rate: car.daily_rate,
        license_plate: car.license_plate,
        fine_amount: car.fine_amount,
        brand: car.brand,
        category_id: car.category_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with available true by default", async () => {
    const car: Car = await createCarUseCase.execute({
      name: "Car Test",
      description: "Car description Test",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand Test",
      category_id: "category_id",
    });

    expect(car.available).toBe(true);
  });
});
