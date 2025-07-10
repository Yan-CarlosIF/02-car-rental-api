import { container } from "tsyringe";
import { ICategoriesRepository } from "@modules/cars/repositories/Icategories.repository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/categories.repository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/specifications.repository";
import { ISpecificationsRepository } from "@modules/cars/repositories/Ispecifications.repository";
import { IUsersRepository } from "@modules/accounts/repositories/Iuser.repository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/user.repository";
import { ICarsRepository } from "@modules/cars/repositories/Icars.repository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/cars.repository";

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
