import { isEmpty } from "lodash";

function registerUser(req, res) {
  const validationErrors = validationResult(req).errors;

  if (!isEmpty(validationErrors)) {
    //const resObj = makeResponseObj(false, validationErrors[0].msg);

    return res.status(400); //.json(resObj);
  }

  const { name, email, password } = matchedData(req);
  return res.status(201).send("Lorem");
}

export { registerUser };
