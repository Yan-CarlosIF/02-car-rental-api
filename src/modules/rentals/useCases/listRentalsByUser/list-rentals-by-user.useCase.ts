import { IRentalsRepository } from "@modules/rentals/repositories/Irentals.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(user_id: string) {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}
