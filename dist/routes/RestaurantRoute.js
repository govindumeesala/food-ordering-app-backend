"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const RestaurantController_1 = __importDefault(require("../controllers/RestaurantController"));
const router = (0, express_1.Router)();
router.get("/:restaurantId", 
// validation
(0, express_validator_1.param)("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantId parameter must be a valid string"), RestaurantController_1.default.getRestaurant);
router.get("/search/:city", 
// validation
(0, express_validator_1.param)("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be valid"), RestaurantController_1.default.searchRestaurant);
exports.default = router;
