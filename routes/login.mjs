import express from "express";

import { loginUser } from "../controllers/login.mjs";
import { loginUserValidator } from "../helpers/validation.mjs";
import { send404Error, send405Error } from "../helpers/response.mjs";

const router = express.Router();

router.post("/", loginUserValidator(), loginUser);
router.all("/", send405Error(["POST"]));

router.all("/*anything", send404Error);

export default router;
