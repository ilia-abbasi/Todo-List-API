import express from "express";

const router = express.Router();

router.post("/", (req, res) => res.send("hi"));

export default router;
