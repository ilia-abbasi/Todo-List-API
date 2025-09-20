import dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";
import express from "express";
import rateLimit from "express-rate-limit";

import db from "../database/db.mjs";
import mainRouter from "../routes/main.mjs";
import { generalErrorHandler, limitResponse } from "../helpers/response.mjs";

const app = express();
const port = process.env.PORT || 4000;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  message: limitResponse,
});

app.use(limiter);
app.use(morgan(":method :url :status - :response-time ms"));
app.use(express.json());

app.use(mainRouter);

app.use(generalErrorHandler);

db.initializePool();

app.listen(port, () => {
  console.log(`Server: Listening on port ${port} ...`);
});
