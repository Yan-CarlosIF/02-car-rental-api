import { CreateRentalController } from "@modules/rentals/useCases/createRental/create-rental.controller";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensure-authenticate.middleware";

export const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
