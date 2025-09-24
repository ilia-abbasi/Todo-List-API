import _ from "lodash";
import { matchedData, validationResult } from "express-validator";

import db from "../database/db.mjs";
import { makeResponseObj } from "../helpers/response.mjs";

async function createTodo(req, res, next) {
  const validationErrors = validationResult(req).errors;

  if (!_.isEmpty(validationErrors)) {
    const resObj = makeResponseObj(false, validationErrors[0].msg);

    return res.status(400).json(resObj);
  }

  const userId = req.user.sub;
  const { title, description } = matchedData(req);

  const queryResult = await db.insertTodo(title, description, userId);
  if (queryResult.err) return next(queryResult.err);

  const resObj = makeResponseObj(true, "Todo item created", queryResult.result);

  return res.status(201).json(resObj);
}

async function updateTodo(req, res, next) {
  const validationErrors = validationResult(req).errors;

  if (!_.isEmpty(validationErrors)) {
    const resObj = makeResponseObj(false, validationErrors[0].msg);

    return res.status(400).json(resObj);
  }

  const userId = req.user.sub;
  const { todoId, title, description } = matchedData(req);

  const queryResult = await db.getTodo(todoId);
  if (queryResult.err) return next(queryResult.err);

  if (!queryResult.result) {
    const resObj = makeResponseObj(false, "Todo item not found");

    return res.status(404).json(resObj);
  }

  if (queryResult.result.user_id !== userId) {
    const resObj = makeResponseObj(false, "Forbidden");

    return res.status(403).json(resObj);
  }

  const updateTodoResult = await db.updateTodo(
    todoId,
    title,
    description,
    userId
  );
  if (updateTodoResult.err) return next(updateTodoResult.err);
  if (!updateTodoResult.result)
    return next(new Error("Database: No todo item updated"));

  const resObj = makeResponseObj(
    true,
    "Updated todo item",
    updateTodoResult.result
  );

  return res.status(200).json(resObj);
}

async function deleteTodo(req, res, next) {
  const validationErrors = validationResult(req).errors;

  if (!_.isEmpty(validationErrors)) {
    const resObj = makeResponseObj(false, validationErrors[0].msg);

    return res.status(400).json(resObj);
  }

  const userId = req.user.sub;
  const { todoId } = matchedData(req);

  const queryResult = await db.getTodo(todoId);
  if (queryResult.err) return next(queryResult.err);

  if (!queryResult.result) {
    const resObj = makeResponseObj(false, "Todo item not found");

    return res.status(404).json(resObj);
  }

  if (queryResult.result.user_id !== userId) {
    const resObj = makeResponseObj(false, "Forbidden");

    return res.status(403).json(resObj);
  }

  const deleteTodoResult = await db.deleteTodo(todoId);
  if (deleteTodoResult.err) return next(deleteTodoResult.err);

  return res.status(204).send();
}

async function getTodos(req, res, next) {
  const validationErrors = validationResult(req).errors;

  if (!_.isEmpty(validationErrors)) {
    const resObj = makeResponseObj(false, validationErrors[0].msg);

    return res.status(400).json(resObj);
  }

  const userId = req.user.sub;
  const { page, limit } = matchedData(req);

  const queryResult = await db.getTodos(page, limit, userId);
  if (queryResult.err) return next(queryResult.err);

  const data = {
    todos: queryResult.result,
    page: page,
    limit: limit,
    total: queryResult.result.length,
  };
  let message = "Got todo items";
  if (_.isEmpty(data.todos)) message = "No result";

  const resObj = makeResponseObj(true, message, data);

  return res.status(200).json(resObj);
}

async function getTodo(req, res, next) {
  const validationErrors = validationResult(req).errors;

  if (!_.isEmpty(validationErrors)) {
    const resObj = makeResponseObj(false, validationErrors[0].msg);

    return res.status(400).json(resObj);
  }

  const userId = req.user.sub;
  const { todoId } = matchedData(req);

  const queryResult = await db.getTodo(todoId);
  if (queryResult.err) return next(queryResult.err);
  if (!queryResult.result) {
    const resObj = makeResponseObj(false, "Todo item not found");

    return res.status(404).json(resObj);
  }

  if (queryResult.result.user_id !== userId) {
    const resObj = makeResponseObj(false, "Forbidden");

    return res.status(403).json(resObj);
  }

  const resObj = makeResponseObj(true, "Got todo item", queryResult.result);

  return res.status(200).json(resObj);
}

export { createTodo, updateTodo, deleteTodo, getTodos, getTodo };
