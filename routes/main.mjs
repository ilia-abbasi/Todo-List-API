import express from "express";

import registerRouter from "./register.mjs";
import loginRouter from "./login.mjs";
import todosRouter from "./todos.mjs";

const router = express.Router();

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/todos", todosRouter);

export default router;
