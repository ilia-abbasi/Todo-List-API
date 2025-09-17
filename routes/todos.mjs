import express from "express";

import { createTodo } from "../controllers/todos.mjs";
import { createTodoValidator } from "../helpers/validation.mjs";

const router = express.Router();

router.post("/", createTodoValidator(), createTodo);

export default router;
