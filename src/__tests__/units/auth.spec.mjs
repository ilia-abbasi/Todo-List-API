import "../../helpers/load_env.mjs";

import mocks from "../../helpers/mocks.mjs";
import { createJWT, verifyToken } from "../../helpers/auth.mjs";
import { makeResponseObj } from "../../helpers/response.mjs";

describe("creating a JWT", () => {
  it("should return a JWT when all fields are present", () => {
    const jwt = createJWT(...Object.values(mocks.userData));

    expect(jwt).toBeTruthy();
  });

  it("should return false when some fields are missing", () => {
    const jwt = createJWT(mocks.userData.id, mocks.userData.name);

    expect(jwt).toEqual(false);
  });
});

describe("verifying a JWT", () => {
  it("should verify a valid JWT", () => {
    const jwt = createJWT(
      ...Object.values(mocks.userData),
      "1h",
      mocks.jwtSecret
    );

    mocks.req.headers.authorization = `Bearer ${jwt}`;
    mocks.verifyTokenMiddleware(mocks.req, mocks.res, mocks.next);

    expect(mocks.next).toHaveBeenCalledTimes(1);
  });

  it("should notice the absence of JWT", () => {
    const resObj = makeResponseObj(false, "Unauthorized");

    mocks.req.headers.authorization = undefined;
    mocks.verifyTokenMiddleware(mocks.req, mocks.res, mocks.next);

    expect(mocks.next).not.toHaveBeenCalled();
    expect(mocks.res.status).toHaveBeenCalledWith(401);
    expect(mocks.res.json).toHaveBeenCalledWith(resObj);
  });

  it("should not verify an expired JWT", () => {
    const resObj = makeResponseObj(false, "Invalid or expired token");

    mocks.req.headers.authorization = `Bearer ${mocks.expiredJWT}`;
    mocks.verifyTokenMiddleware(mocks.req, mocks.res, mocks.next);

    expect(mocks.next).not.toHaveBeenCalled();
    expect(mocks.res.status).toHaveBeenCalledWith(401);
    expect(mocks.res.json).toHaveBeenCalledWith(resObj);
  });
});
