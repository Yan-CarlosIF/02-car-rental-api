import { SpecificationsRepository } from "../../repositories/implementations/specifications.repository";
import { CreateSpecificationController } from "./create-specification.controller";
import { CreateEspecificationUseCase } from "./create-specification.useCase";

const specificationsRepository = SpecificationsRepository.getInstance();
const createSpecificationUseCase = new CreateEspecificationUseCase(
  specificationsRepository
);

export const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);
