import express from "express";

import { verifyToken } from "../helpers/auth.mjs";
import { createTodo } from "../controllers/todos.mjs";
import { createTodoValidator } from "../helpers/validation.mjs";

const router = express.Router();

router.use(verifyToken);
router.post("/", createTodoValidator(), createTodo);

export default router;
