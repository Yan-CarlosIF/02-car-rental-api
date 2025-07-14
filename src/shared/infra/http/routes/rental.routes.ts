import { CreateRentalController } from "@modules/rentals/useCases/createRental/create-rental.controller";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/devolution-rental.controller";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensure-authenticate.middleware";

export const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);
