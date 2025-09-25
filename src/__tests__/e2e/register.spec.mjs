import "../../helpers/load_env.mjs";

import request from "supertest";
import db from "../../database/db.mjs";
import { createApp } from "../../app/app.mjs";

const app = createApp();
db.initializePool({ test: true });

afterAll(async () => {
  await db.clearTables();
  await db.endPool();
});

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

    await request(app)
      .post("/register")
      .send({
        name: 17,
        email: "john@doe.com",
        password: "abcABC123!",
      })
      .expect(400);

    await request(app)
      .post("/register")
      .send({
        name: "01234567890123456789012345678901234567890123456789a",
        email: "john@doe.com",
        password: "abcABC123!",
      })
      .expect(400);
  });

  it("should validate email", async () => {
    await request(app)
      .post("/register")
      .send({
        name: "John Doe",
        email: "@doe.com",
        password: "abcABC123!",
      })
      .expect(400);

    await request(app)
      .post("/register")
      .send({
        name: "John Doe",
        email: "john@.com",
        password: "abcABC123!",
      })
      .expect(400);

    await request(app)
      .post("/register")
      .send({
        name: "John Doe",
        email: "jo hn@doe.com",
        password: "abcABC123!",
      })
      .expect(400);

    await request(app)
      .post("/register")
      .send({
        name: "John Doe",
        email: "john@doe@example.test",
        password: "abcABC123!",
      })
      .expect(400);
  });

  it("should validate password", async () => {
    await request(app)
      .post("/register")
      .send({
        name: "John Doe",
        email: "john@doe.com",
        password: "abc",
      })
      .expect(400);
  });
});
