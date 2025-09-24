import _ from "lodash";
import bcrypt from "bcryptjs";
import { matchedData, validationResult } from "express-validator";

import db from "../database/db.mjs";
import { createJWT } from "../helpers/auth.mjs";
import { makeResponseObj } from "../helpers/response.mjs";

async function registerUser(req, res, next) {
  const validationErrors = validationResult(req).errors;

  if (!_.isEmpty(validationErrors)) {
    const resObj = makeResponseObj(false, validationErrors[0].msg);

    return res.status(400).json(resObj);
  }

  const { name, email, password } = matchedData(req);

  const userCountResult = await db.getUserCountByEmail(email);
  if (userCountResult.err) return next(userCountResult.err);
  if (userCountResult.result) {
    const resObj = makeResponseObj(false, "This email is already in use");

    return res.status(409).json(resObj);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const insertUserResult = await db.insertUser(name, email, hashedPassword);
  if (insertUserResult.err) return next(insertUserResult.err);

  const userId = insertUserResult.result.user_id;
  const token = createJWT(userId, name, email, "1h");

  const resObj = makeResponseObj(true, "Successfully registered", { token });

  return res.status(201).json(resObj);
}

export { registerUser };
