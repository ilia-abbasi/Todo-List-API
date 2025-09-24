import "../../helpers/load_env.mjs";
import mocks from "../mocks.mjs";
import { createJWT } from "../../helpers/auth.mjs";

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
