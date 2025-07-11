import { ICreateRentalDTO } from "@modules/rentals/dtos/Icreate-rental.dto";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./create-rental.useCase";

export class CreateRentalController {
  async handle(
    request: Request<{}, {}, Omit<ICreateRentalDTO, "user_id">>,
    response: Response
  ) {
    const { car_id, expected_return_date } = request.body;
    const { id: user_id } = request.user;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      user_id,
      expected_return_date,
    });

    return response.status(201).send(rental);
  }
}
