import { AuthenticateUserController } from "@modules/accounts/userCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/userCases/refreshToken/RefreshTokenController";
import { Router } from "express";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes }