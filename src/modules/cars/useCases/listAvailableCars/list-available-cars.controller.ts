import { IFindCarDTO } from "@modules/cars/dtos/Ifind-car.dto";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./list-available-cars.useCase";

export class ListAvailableCarsController {
  async handle(request: Request<{}, {}, {}, IFindCarDTO>, response: Response) {
    const { brand, category_id, name } = request.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      brand,
      category_id,
      name,
    });

    return response.status(200).json(cars);
  }
}
