import uploadConfig from "@config/upload";
import { CreateCarControler } from "@modules/cars/useCases/createCar/create-car.controller";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/create-car-specification.controller";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/list-available-cars.controller";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/upload-car-images.controller";
import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensure-admin.middleware";
import { ensureAuthenticated } from "../middlewares/ensure-authenticate.middleware";
export const carsRoutes = Router();

const createCarController = new CreateCarControler();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadCarImage = multer(uploadConfig);

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  // @ts-ignore
  uploadCarImage.array("images"),
  uploadCarImagesController.handle
);
