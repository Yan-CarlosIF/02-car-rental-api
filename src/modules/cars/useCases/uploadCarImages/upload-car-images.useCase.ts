import { ICarsImagesRepository } from "@modules/cars/repositories/Icars-images.repository";
import { IStorageProvider } from "@shared/conteiner/providers/storageProvider/Istorage-provider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_names }: IRequest) {
    images_names.forEach(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}
