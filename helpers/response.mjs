function makeResponseObj(success, message, data = {}) {
  return { success, message, data };
}

function send404Error(req, res) {
  const resObj = makeResponseObj(false, "Not found");

  return res.status(404).json(resObj);
}

function send405Error(allowedMethods) {
  let allowHeaderValue = "";

  for (const allowedMethod of allowedMethods) {
    allowHeaderValue = `${allowHeaderValue}${allowedMethod}, `;
  }
  allowHeaderValue = allowHeaderValue.slice(0, -2);

  return (req, res) => {
    const resObj = makeResponseObj(
      false,
      `You can not ${req.method} ${req.baseUrl + req.path}`
    );

    res.set("Allow", allowHeaderValue);
    return res.status(405).json(resObj);
  };
}

function generalErrorHandler(err, req, res, next) {
  console.log(`An error occurred: ${err.message}`);
  console.log(err.stack);

  const resObj = makeResponseObj(
    false,
    "Something went wrong while completing your request"
  );

  return res.status(500).json(resObj);
}

export { makeResponseObj, send404Error, send405Error, generalErrorHandler };
