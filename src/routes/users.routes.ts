import { Router } from "express";
import { CreateUserController } from "../modules/accounts/userCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/userCases/updateUserAvatar/UpdateUserAvatarController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handle);

userRoutes.patch("/avatar", updateUserAvatarController.handle);

export { userRoutes }