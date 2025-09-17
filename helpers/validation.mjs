import { body } from "express-validator";

const nameValidator = () =>
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("name length can not exceed 50");

const emailValidator = () =>
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email must be a string")
    .isLength({ min: 1, max: 320 })
    .withMessage("email length can not exceed 320")
    .isEmail()
    .withMessage("email must be valid");

const passwordValidator = (strongPasswordMessage) =>
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string")
    .isLength({ max: 10 * 1000 })
    .withMessage("Are you serious?")
    .isStrongPassword()
    .withMessage(strongPasswordMessage);

const registerUserValidator = () => [
  nameValidator(),
  emailValidator(),
  passwordValidator("Please choose a stronger password"),
];

const loginUserValidator = () => [
  emailValidator(),
  passwordValidator("Bad credentials"),
];

export { registerUserValidator, loginUserValidator };
