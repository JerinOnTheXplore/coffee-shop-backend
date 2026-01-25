import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { ReviewController } from "./review.controller";


const router = Router();

//customer review post korte parbe..
router.post(
    "/reviews",
    authMiddleware,
    roleMiddleware("CUSTOMER"),
    ReviewController.createReview
);

// GET /coffees/:id/reviews (public)
router.get("/coffees/:id/reviews",ReviewController.getCoffeeReviews);

// DELETE /api/reviews/<reviewId> eta admin korbe..
router.delete(
    "/review/:id",
    authMiddleware,//auth age ..role pore..eta jiboneo vulbona..
    roleMiddleware("ADMIN"),
    ReviewController.deleteReview
)

export const ReviewRoutes = router;