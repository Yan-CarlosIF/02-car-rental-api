import { CreateCarControler } from "@modules/cars/useCases/createCar/create-car.controller";
import { Router } from "express";

export const carsRoutes = Router();
const createCarController = new CreateCarControler();

carsRoutes.post("/", createCarController.handle);
