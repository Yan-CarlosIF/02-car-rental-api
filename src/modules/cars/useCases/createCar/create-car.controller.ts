import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./create-car.useCase";

export class CreateCarControler {
  async handle(request: Request<{}, {}, Car>, response: Response) {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return response.status(201).json(car);
  }
}
