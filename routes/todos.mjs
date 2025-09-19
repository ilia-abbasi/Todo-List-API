import express from "express";

import { verifyToken } from "../helpers/auth.mjs";
import { createTodo, deleteTodo, updateTodo } from "../controllers/todos.mjs";
import {
  createTodoValidator,
  deleteTodoValidator,
  updateTodoValidator,
} from "../helpers/validation.mjs";

const router = express.Router();

router.use(verifyToken);

router.post("/", createTodoValidator(), createTodo);
router.put("/:todoId", updateTodoValidator(), updateTodo);
router.delete("/:todoId", deleteTodoValidator(), deleteTodo);

export default router;
