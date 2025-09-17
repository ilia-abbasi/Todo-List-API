import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import mainRouter from "../routes/main.mjs";
import { generalErrorHandler } from "../helpers/response.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan(":method :url :status - :response-time ms"));
app.use(mainRouter);

app.use(generalErrorHandler);

app.listen(port, () => {
  console.log(`Server: Listening on port ${port} ...`);
});
