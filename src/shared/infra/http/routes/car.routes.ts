import { CreateCarControler } from "@modules/cars/useCases/createCar/create-car.controller";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/list-available-cars.controller";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensure-admin.middleware";
import { ensureAuthenticated } from "../middlewares/ensure-authenticate.middleware";

export const carsRoutes = Router();
const createCarController = new CreateCarControler();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);
