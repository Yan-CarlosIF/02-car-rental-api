import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/cars-in-memory.repository";
import { ListAvailableCarsUseCase } from "./list-available-cars.useCase";

describe("List Cars", () => {
  let listCarsUseCase: ListAvailableCarsUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;

  const car1 = {
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
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create(car1);

    const car2 = await carsRepositoryInMemory.create({
      name: "Car Test 2",
      description: "Car description Test",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand Test",
      category_id: "category_id",
    });

    car2.available = false;

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all cars by name", async () => {
    const car = await carsRepositoryInMemory.create(car1);

    const cars = await listCarsUseCase.execute({ name: "car" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all cars by brand", async () => {
    const car = await carsRepositoryInMemory.create(car1);

    const cars = await listCarsUseCase.execute({ brand: "Brand Test" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all cars by category", async () => {
    const car = await carsRepositoryInMemory.create(car1);

    const cars = await listCarsUseCase.execute({ category_id: "category_id" });

    expect(cars).toEqual([car]);
  });
});
