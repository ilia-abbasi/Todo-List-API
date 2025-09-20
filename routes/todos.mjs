import express from "express";

import { verifyToken } from "../helpers/auth.mjs";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todos.mjs";
import {
  createTodoValidator,
  deleteTodoValidator,
  getTodosValidator,
  updateTodoValidator,
} from "../helpers/validation.mjs";
import { send404Error, send405Error } from "../helpers/response.mjs";

const router = express.Router();

router.use("/", verifyToken);
router.use("/:todoId", verifyToken);

router.post("/", createTodoValidator(), createTodo);
router.get("/", getTodosValidator(), getTodos);
router.all("/", send405Error(["POST", "GET"]));

router.put("/:todoId", updateTodoValidator(), updateTodo);
router.delete("/:todoId", deleteTodoValidator(), deleteTodo);
router.all("/:todoId", send405Error(["PUT", "DELETE"]));

router.all("/*anything", send404Error);

export default router;
