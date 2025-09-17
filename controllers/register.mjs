import _ from "lodash";
import bcrypt from "bcryptjs";
import { matchedData, validationResult } from "express-validator";

import { makeResponseObj } from "../helpers/response.mjs";
import { checkEmailExists, insertUser } from "../database/db.mjs";

async function registerUser(req, res, next) {
  const validationErrors = validationResult(req).errors;

  if (!_.isEmpty(validationErrors)) {
    const resObj = makeResponseObj(false, validationErrors[0].msg);

    return res.status(400).json(resObj);
  }

  const { name, email, password } = matchedData(req);

  const checkEmailResult = await checkEmailExists(email);
  if (checkEmailResult.error) return next(checkEmailResult.error);
  if (checkEmailResult.result) {
    const resObj = makeResponseObj(false, "This email is already in use");

    return res.status(409).json(resObj);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const insertUserResult = await insertUser(name, email, hashedPassword);
  if (insertUserResult.error) return next(insertUserResult.error);

  const { user_id } = insertUserResult.result;

  return res.status(201).send("Lorem");
}

export { registerUser };
