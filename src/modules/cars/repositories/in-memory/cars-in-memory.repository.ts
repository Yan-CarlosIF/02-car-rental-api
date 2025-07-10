import { ICreateCarDTO } from "@modules/cars/dtos/Icreate-car.dto";
import { ICarsRepository } from "../Icars.repository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create(data: ICreateCarDTO) {
    const car = new Car();

    Object.assign(car, { ...data });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((cars) => cars.license_plate === license_plate);
  }
}
