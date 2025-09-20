import express from "express";

import registerRouter from "./register.mjs";
import loginRouter from "./login.mjs";
import todosRouter from "./todos.mjs";
import { send404Error } from "../helpers/response.mjs";

const router = express.Router();

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/todos", todosRouter);

router.all("/{*anything}", send404Error);

export default router;
