import _ from "lodash";
import bcrypt from "bcryptjs";
import { matchedData, validationResult } from "express-validator";

import { createJWT } from "../helpers/auth.mjs";
import { makeResponseObj } from "../helpers/response.mjs";
import { selectUser, updateLastLogin } from "../database/db.mjs";

async function loginUser(req, res, next) {
  const validationErrors = validationResult(req).errors;

  if (!_.isEmpty(validationErrors)) {
    const resObj = makeResponseObj(false, validationErrors[0].msg);
    let statusCode = 400;

    if (resObj.message === "Bad credentials") statusCode = 401;

    return res.status(statusCode).json(resObj);
  }

  const { email, password } = matchedData(req);
  const queryResult = await selectUser(email);
  if (queryResult.error) return next(queryResult.error);

  if (!queryResult.result) {
    const resObj = makeResponseObj(false, "Bad credentials");

    return res.status(401).json(resObj);
  }

  const { user_id, name } = queryResult.result;
  const hashedPassword = queryResult.result.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);

  if (!passwordsMatch) {
    const resObj = makeResponseObj(false, "Bad credentials");

    return res.status(401).json(resObj);
  }

  const token = createJWT(user_id, name, email, "1h");
  const resObj = makeResponseObj(true, "Login successful", { token });

  res.status(200).json(resObj);
  await updateLastLogin(user_id);
}

export { loginUser };
