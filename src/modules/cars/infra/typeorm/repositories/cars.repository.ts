import { ICreateCarDTO } from "@modules/cars/dtos/Icreate-car.dto";
import { IFindCarDTO } from "@modules/cars/dtos/Ifind-car.dto";
import { ICarsRepository } from "@modules/cars/repositories/Icars.repository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return await this.repository.findOne({ license_plate });
  }

  async findAvailable({
    brand,
    category_id,
    name,
  }: IFindCarDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("cars")
      .where("cars.available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("cars.brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("cars.name ILIKE :name", { name: `%${name}%` });
    }

    if (category_id) {
      carsQuery.andWhere("cars.category_id = :category_id", { category_id });
    }

    return await carsQuery.getMany();
  }

  async findById(id: string): Promise<Car | undefined> {
    return await this.repository.findOne(id);
  }
}
