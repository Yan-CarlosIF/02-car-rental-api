import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/create-user.controller";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/update-user-avatar.controller";

import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate.middleware";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

export const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  // @ts-ignore
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
