import { body, validationResult } from "express-validator";
import Big from "big.js";

export const validateProductData = async (req, res, next) => {
  await body("courseTitle")
    .isLength({ min: 10, max: 200 })
    .withMessage("Course Title must be between 10 and 200 characters")
    .run(req);

  await body("courseDescription")
    .isLength({ min: 100, max: 1000 })
    .withMessage("Course Title must be between 100 and 1000 characters")
    .run(req);

  await body("courseCost")
    .custom((value) => {
      console.log("Eval: ", value);
      let convertedValue = new Big(value);
      console.log(
        convertedValue.toNumber() < 1,
        convertedValue.toNumber() > 9999,
      );
      if (convertedValue.toNumber() < 1 || convertedValue.toNumber() > 9999) {
        throw new Error(
          "Course Cost must be greater than $1.00 may not exceed $9999.99 USD.",
        );
      }
      return true;
    })
    .withMessage(
      "Course Cost must be greater than $1.00 may not exceed $9999.99 USD.",
    )
    .run(req);

  let validatedResults = validationResult(req);

  if (validatedResults.isEmpty()) {
    return next();
  }
  return res.status(400).json(validatedResults.array());
};
