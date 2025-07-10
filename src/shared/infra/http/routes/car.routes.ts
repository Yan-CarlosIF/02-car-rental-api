import { CreateCarControler } from "@modules/cars/useCases/createCar/create-car.controller";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensure-admin.middleware";
import { ensureAuthenticated } from "../middlewares/ensure-authenticate.middleware";

export const carsRoutes = Router();
const createCarController = new CreateCarControler();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);
