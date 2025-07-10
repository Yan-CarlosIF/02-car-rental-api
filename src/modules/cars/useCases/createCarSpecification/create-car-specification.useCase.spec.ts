import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/cars-in-memory.repository";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/specification-in-memory.repository";
import { AppError } from "@shared/errors/app-error";
import { CreateCarSpecificationUseCase } from "./create-car-specification.useCase";

describe("Create Car Specification", () => {
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

  const carTest = {
    name: "Car Test",
    description: "Car description Test",
    daily_rate: 100,
    license_plate: "ABC-1234",
    fine_amount: 60,
    brand: "Brand Test",
    category_id: "category_id",
  };

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a nonexistent car", () => {
    expect(async () => {
      const car_id = "123";
      const specifications_id = ["456", "789"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to a car", async () => {
    const car = await carsRepositoryInMemory.create(carTest);

    const specification = await specificationsRepositoryInMemory.create({
      name: "Specification Test",
      description: "Specification description Test",
    });

    const specifications_id = [specification.id];

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications.length).toBe(1);
  });
});
