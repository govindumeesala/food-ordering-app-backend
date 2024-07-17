import { Router } from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = Router();

router.get(
  "/:restaurantId",
  // validation
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantId parameter must be a valid string"),
  RestaurantController.getRestaurant
);

router.get(
  "/search/:city",
  // validation
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be valid"),
  RestaurantController.searchRestaurant
);

export default router;
