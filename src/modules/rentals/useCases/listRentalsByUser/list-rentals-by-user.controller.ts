import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./list-rentals-by-user.useCase";

export class ListRentalsByUserController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;

    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase
    );

    const rentals = await listRentalsByUserUseCase.execute(user_id);

    return response.status(200).json(rentals);
  }
}
