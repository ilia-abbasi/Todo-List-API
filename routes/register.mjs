import express from "express";
import { registerUser } from "../controllers/register.mjs";

const router = express.Router();

router.post("/", registerUser);

export default router;
