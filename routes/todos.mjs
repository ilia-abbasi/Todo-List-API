import express from "express";

import { verifyToken } from "../helpers/auth.mjs";
import { createTodo, updateTodo } from "../controllers/todos.mjs";
import {
  createTodoValidator,
  updateTodoValidator,
} from "../helpers/validation.mjs";

const router = express.Router();

router.use(verifyToken);
router.post("/", createTodoValidator(), createTodo);
router.put("/:todoId", updateTodoValidator(), updateTodo);

export default router;
