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

// admin update korbe coffee..
router.patch(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    CoffeeController.updateCoffee
);

// admin coffee delete korbe....
router.delete(
    "/:id",
    authMiddleware,// ei khane role age diye disilam..eta korle token verify korar agei req.user.role check kore...tai Cannot read properties of undefined (reading 'role') eita ashchilo..
    roleMiddleware("ADMIN"),
    CoffeeController.deleteCoffee
);

// public all coffees get korte pare...
router.get("/", CoffeeController.getAllCoffees);

// public single coffee get kore........
router.get("/:id", CoffeeController.getSingleCoffee);


export const CoffeeRoutes = router;
