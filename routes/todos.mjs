import express from "express";

import { createTodo } from "../controllers/todos.mjs";

const router = express.Router();

router.post("/", createTodo);

export default router;
