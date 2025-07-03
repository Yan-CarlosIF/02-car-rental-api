import { Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/specifications.repository";
import { CreateEspecificationService } from "../modules/cars/services/create-specification.service";

export const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateEspecificationService(
    specificationsRepository
  );

  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});
