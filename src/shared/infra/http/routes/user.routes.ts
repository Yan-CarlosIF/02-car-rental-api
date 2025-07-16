import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/create-user.controller";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/update-user-avatar.controller";

import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensure-authenticate.middleware";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/profile-user.controller";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

export const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  // @ts-ignore
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
