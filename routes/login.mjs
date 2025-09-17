import express from "express";

import { loginUser } from "../controllers/login.mjs";
import { loginUserValidator } from "../helpers/validation.mjs";

const router = express.Router();

router.post("/", loginUserValidator(), loginUser);

export default router;
