import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./upload-car-images.useCase";

export class UploadCarImagesController {
  async handle(request: Request, response: Response) {
    const { id: car_id } = request.params;

    const images = request.files as Express.Multer.File[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const fileNames = images.map((file) => file.filename);

    await uploadCarImagesUseCase.execute({
      car_id,
      images_names: fileNames,
    });

    return response.status(201).send();
  }
}
