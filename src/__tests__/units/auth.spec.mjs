import "../../helpers/load_env.mjs";
import mocks from "../../helpers/mocks.mjs";
import { createJWT, verifyToken } from "../../helpers/auth.mjs";

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
    const verifyTokenMiddleware = verifyToken(mocks.jwtSecret);

    mocks.req.headers.authorization = `Bearer ${jwt}`;
    verifyTokenMiddleware(mocks.req, mocks.res, mocks.next);

    expect(mocks.next).toHaveBeenCalledTimes(1);
  });
});
