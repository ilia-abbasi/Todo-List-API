import express from "express";

import { registerUser } from "../controllers/register.mjs";
import { registerUserValidator } from "../helpers/validation.mjs";

const router = express.Router();

router.post("/", registerUserValidator(), registerUser);

export default router;
