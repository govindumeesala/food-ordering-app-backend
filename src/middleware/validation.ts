import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleVadilatoinErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const validateMyUserRequest = [
  body("name").isString().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address must be a non empty string"),
  body("city")
    .isString()
    .notEmpty()
    .withMessage("City must be a non empty string"),
  body("country")
    .isString()
    .notEmpty()
    .withMessage("Country must be a non empty string"),
  handleVadilatoinErrors,
];
