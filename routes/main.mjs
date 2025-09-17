import express from "express";

import registerRouter from "./register.mjs";

const router = express.Router();

router.use("/register", registerRouter);

export default router;
