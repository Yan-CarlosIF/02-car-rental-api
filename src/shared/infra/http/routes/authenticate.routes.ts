import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/authenticate-user.controller";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/refresh-token.controller";

export const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);
