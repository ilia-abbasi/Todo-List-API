import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import mainRouter from "../routes/main.mjs";
import { generalErrorHandler, limitResponse } from "../helpers/response.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 60,
  message: limitResponse,
});

app.use(limiter);
app.use(morgan(":method :url :status - :response-time ms"));
app.use(express.json());

app.use(mainRouter);

app.use(generalErrorHandler);

app.listen(port, () => {
  console.log(`Server: Listening on port ${port} ...`);
});
