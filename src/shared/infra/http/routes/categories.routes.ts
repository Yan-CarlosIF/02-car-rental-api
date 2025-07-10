import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/create-category.controller";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/import-category.controller";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/list-categories.controller";
import { ensureAdmin } from "../middlewares/ensure-admin.middleware";
import { ensureAuthenticated } from "../middlewares/ensure-authenticate.middleware";

export const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({ dest: "./tmp" });

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  // @ts-ignore
  upload.single("file"),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);
