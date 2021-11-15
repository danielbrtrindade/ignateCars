import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticated, ensureAdmin, createRentalController.handle);

export { rentalRoutes };