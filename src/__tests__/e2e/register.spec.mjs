import request from "supertest";
import { createApp } from "../../app/app.mjs";

const app = createApp();

describe("validation test", () => {
  it("should validate name", async () => {
    await request(app)
      .post("/register")
      .send({
        name: "",
        email: "john@doe.com",
        password: "abcABC123!",
      })
      .expect(400);
  });
});
