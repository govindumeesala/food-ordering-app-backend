import { Router } from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = Router();

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
