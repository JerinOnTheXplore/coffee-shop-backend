import { Router } from "express";
import { CoffeeController } from "./coffee.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

// admin coffee banabe.......
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  CoffeeController.createCoffee
);

// public all coffees get korte pare...
router.get("/", CoffeeController.getAllCoffees);

// public single coffee get kore........
router.get("/:id", CoffeeController.getSingleCoffee);


export const CoffeeRoutes = router;
