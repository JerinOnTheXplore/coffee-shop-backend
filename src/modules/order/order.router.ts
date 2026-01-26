import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { orderController } from "./order.controller";


const router = Router();
//customer oredr place korbe..
router.post(
    "/orders",
    authMiddleware,
    roleMiddleware("CUSTOMER"),
    orderController.createOrder
);

//customer my order e nijeder order dekhbe..
router.get(
    "/orders/my",
    authMiddleware,
    roleMiddleware("CUSTOMER"),
    orderController.getMyOrders
);

//admin sob order dekhte pabe..
router.get(
    "/orders",
    authMiddleware,
    roleMiddleware("ADMIN"),
    orderController.getAllOrders
);

// admin order status update korbe..
router.patch(
    "/orders/:id/status",
    authMiddleware,
    roleMiddleware("ADMIN"),
    orderController.updateOrderStatus
);

export const OrderRoutes = router;
