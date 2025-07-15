import { ResetUserPasswordController } from "@modules/accounts/useCases/resetUserPassword/reser-user-password.controller";
import { SendForgottenPasswordMailController } from "@modules/accounts/useCases/sendForgottenPasswordMail/send-forgotten-password-mail.controller";
import { Router } from "express";

export const passwordRoutes = Router();

const sendForgottenPasswordMailController =
  new SendForgottenPasswordMailController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/forgot", sendForgottenPasswordMailController.handle);
passwordRoutes.post("/reset", resetUserPasswordController.handle);
