import { ICreateRentalDTO } from "@modules/rentals/dtos/Icreate-rental.dto";
import { IRentalsRepository } from "@modules/rentals/repositories/Irentals.repository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    return await this.repository.findOne({ car_id });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    return await this.repository.findOne({ user_id });
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    return await this.repository.save(rental);
  }
}
