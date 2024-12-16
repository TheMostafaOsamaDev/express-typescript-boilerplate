import { body } from "express-validator";

export const validateSignUp = [
  body("email").isEmail().withMessage("Invalid email"),
  body("fullName").isString().withMessage("Invalid full name"),
  body("password")
    .isString()
    .withMessage("Invalid password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .isStrongPassword()
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  // confirmPassword must be the same as password
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

export const validateLogIn = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isString().withMessage("Invalid password"),
];
