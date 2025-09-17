import _ from "lodash";
import bcrypt from "bcryptjs";
import { matchedData, validationResult } from "express-validator";

async function loginUser(req, res, next) {
  const validationErrors = validationResult(req).errors;

  if (!_.isEmpty(validationErrors)) {
    const resObj = makeResponseObj(false, validationErrors[0].msg);
    const statusCode = 400;

    if (resObj.message === "Bad credentials") statusCode = 401;

    return res.status(statusCode).json(resObj);
  }

  const { email, password } = matchedData(req);
}

export { loginUser };
