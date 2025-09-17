import _ from "lodash";
import { matchedData, validationResult } from "express-validator";

import { makeResponseObj } from "../helpers/response.mjs";
import { checkEmailExists } from "../database/db.mjs";

async function registerUser(req, res) {
  const validationErrors = validationResult(req).errors;

  if (!_.isEmpty(validationErrors)) {
    const resObj = makeResponseObj(false, validationErrors[0].msg);

    return res.status(400).json(resObj);
  }

  const { name, email, password } = matchedData(req);

  return res.status(201).send("Lorem");
}

export { registerUser };
