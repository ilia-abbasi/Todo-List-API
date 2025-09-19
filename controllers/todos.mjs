import _ from "lodash";
import { matchedData, validationResult } from "express-validator";

import { insertTodo } from "../database/db.mjs";
import { makeResponseObj } from "../helpers/response.mjs";

async function createTodo(req, res, next) {
  const validationErrors = validationResult(req).errors;

  if (!_.isEmpty(validationErrors)) {
    const resObj = makeResponseObj(false, validationErrors[0].msg);

    return res.status(400).json(resObj);
  }

  const user_id = req.user.sub;
  const { title, description } = matchedData(req);

  const queryResult = await insertTodo(title, description, user_id);
  if (queryResult.err) return next(queryResult.err);

  const resObj = makeResponseObj(true, "Todo item created", queryResult.result);

  return res.status(201).json(resObj);
}

async function updateTodo(req, res, next) {
  //
}

export { createTodo, updateTodo };
