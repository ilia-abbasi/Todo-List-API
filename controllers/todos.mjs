import _ from "lodash";
import { matchedData, validationResult } from "express-validator";

import { makeResponseObj } from "../helpers/response.mjs";

async function createTodo(req, res, next) {
  console.log(req.user);
  res.status(201).send(":)");
}

export { createTodo };
