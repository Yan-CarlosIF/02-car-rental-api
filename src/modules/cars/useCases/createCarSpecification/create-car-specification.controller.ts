import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./create-car-specification.useCase";

export class CreateCarSpecificationController {
  async handle(request: Request, response: Response) {
    const { id: car_id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const cars = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    return response.json(cars);
  }
}
