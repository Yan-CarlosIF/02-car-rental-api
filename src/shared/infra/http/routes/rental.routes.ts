import { CreateRentalController } from "@modules/rentals/useCases/createRental/create-rental.controller";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/devolution-rental.controller";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/list-rentals-by-user.controller";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensure-authenticate.middleware";

export const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);
