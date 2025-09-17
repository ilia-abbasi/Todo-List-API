import express from "express";

import registerRouter from "./register.mjs";
import loginRouter from "./login.mjs";

const router = express.Router();

router.use("/register", registerRouter);
router.use("/login", loginRouter);

export default router;
