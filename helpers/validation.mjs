import { body, param, query } from "express-validator";

const nameValidator = () =>
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .isLength({ max: 50 })
    .withMessage("name length can not exceed 50");

const emailValidator = () =>
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email must be a string")
    .isLength({ max: 320 })
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

const titleValidator = () =>
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string")
    .isLength({ max: 50 })
    .withMessage("title length can not exceed 50");

const descriptionValidator = () =>
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string")
    .isLength({ max: 3000 })
    .withMessage("description length can not exceed 3000");

const todoIdValidator = () =>
  param("todoId")
    .notEmpty()
    .withMessage("todo ID is required")
    .isInt({ min: 1 })
    .withMessage("todo ID must be a positive integer");

const pageValidator = () =>
  query("page")
    .trim()
    .notEmpty()
    .withMessage("page is required")
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer");

const limitValidator = () =>
  query("limit")
    .trim()
    .notEmpty()
    .withMessage("limit is required")
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be an integer in 1-100 range");

const registerUserValidator = () => [
  nameValidator(),
  emailValidator(),
  passwordValidator("Please choose a stronger password"),
];

const loginUserValidator = () => [
  emailValidator(),
  passwordValidator("Bad credentials"),
];

const createTodoValidator = () => [titleValidator(), descriptionValidator()];

const updateTodoValidator = () => [
  todoIdValidator(),
  titleValidator(),
  descriptionValidator(),
];

const deleteTodoValidator = () => [todoIdValidator()];

const getTodosValidator = () => [pageValidator(), limitValidator()];

const getTodoValidator = () => [todoIdValidator()];

export {
  registerUserValidator,
  loginUserValidator,
  createTodoValidator,
  updateTodoValidator,
  deleteTodoValidator,
  getTodosValidator,
  getTodoValidator,
};
