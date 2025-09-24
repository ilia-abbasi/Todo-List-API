import express from "express";

import { registerUser } from "../controllers/register.mjs";
import { registerUserValidator } from "../helpers/validation.mjs";
import { send404Error, send405Error } from "../helpers/response.mjs";

const router = express.Router();

router.post("/", registerUserValidator(), registerUser);
router.all("/", send405Error(["POST"]));

router.all("/*anything", send404Error);

export default router;
