import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/create-specification.controller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate.middleware";

export const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);
