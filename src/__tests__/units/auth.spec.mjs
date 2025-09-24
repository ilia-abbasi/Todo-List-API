import "../../helpers/load_env.mjs";
import { createJWT } from "../../helpers/auth.mjs";

const mockUserData = {
  id: 7,
  name: "John Doe",
  email: "john@doe.com",
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

describe("creating a JWT", () => {
  it("should return a JWT when all fields are present", () => {
    const jwt = createJWT(...Object.values(mockUserData));
    expect(jwt).toBeTruthy();
  });

  it("should return false when some fields are missing", () => {
    const jwt = createJWT(mockUserData.id, mockUserData.name);
    expect(jwt).toEqual(false);
  });
});
