import { ICreateCarDTO } from "@modules/cars/dtos/Icreate-car.dto";
import { ICarsRepository } from "../Icars.repository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { IFindCarDTO } from "@modules/cars/dtos/Ifind-car.dto";

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

  async findAvailable({
    category_id,
    brand,
    name,
  }: IFindCarDTO): Promise<Car[]> {
    const allAvailableCars = this.cars.filter((car) => car.available);

    return allAvailableCars.filter(
      (car) =>
        (category_id ? car.category_id === category_id : true) &&
        (brand ? car.brand === brand : true) &&
        (name ? car.name.toLowerCase().includes(name.toLowerCase()) : true)
    );
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === id);

    this.cars[carIndex].available = available;
  }
}
