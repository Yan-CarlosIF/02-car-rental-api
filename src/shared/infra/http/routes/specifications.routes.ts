import { Router } from "express";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/create-specification.controller";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensure-authenticate.middleware";
import { ensureAdmin } from "../middlewares/ensure-admin.middleware";

export const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);
