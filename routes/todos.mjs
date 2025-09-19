import express from "express";

import { verifyToken } from "../helpers/auth.mjs";
import { createTodoValidator } from "../helpers/validation.mjs";
import { createTodo, updateTodo } from "../controllers/todos.mjs";

const router = express.Router();

router.use(verifyToken);
router.post("/", createTodoValidator(), createTodo);
router.put("/:todoId", updateTodo);

export default router;
