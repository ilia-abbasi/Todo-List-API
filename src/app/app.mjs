import morgan from "morgan";
import express from "express";
import rateLimit from "express-rate-limit";

import mainRouter from "../routes/main.mjs";
import { generalErrorHandler, limitResponse } from "../helpers/response.mjs";

function createApp() {
  const app = express();

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

  return app;
}

export { createApp };
