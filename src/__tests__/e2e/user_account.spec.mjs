import "../../helpers/load_env.mjs";

import request from "supertest";
import db from "../../database/db.mjs";
import { createApp } from "../../app/app.mjs";

const app = createApp();
const userData = {
  name: "John Doe",
  email: "john@doe.com",
  password: "abcABC123!",
};

db.initializePool({ test: true });

afterAll(async () => {
  await db.clearTables();
  await db.endPool();
});

describe("validation test for /register", () => {
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

    await request(app)
      .post("/register")
      .send({
        name: "John Doe",
        email: "john@doe.com",
        password: "aaBB11!",
      })
      .expect(400);
  });
});

describe("registering a new user test", () => {
  it("should successfully create a user with valid info", async () => {
    await request(app).post("/register").send(userData).expect(201);
  });

  it("should not create a user with duplicate email", async () => {
    await request(app)
      .post("/register")
      .send({
        name: "Doe John",
        email: "john@doe.com",
        password: "!321CBAcba",
      })
      .expect(409);
  });
});

describe("successful login test", () => {
  it("should deny incorrect passwords", async () => {
    await request(app)
      .post("/login")
      .send({
        email: userData.email,
        password: "wrong_PASSWORD!1!1",
      })
      .expect(401);
  });

  it("should accept valid credentials", async () => {
    await request(app)
      .post("/login")
      .send({
        email: userData.email,
        password: userData.password,
      })
      .expect(200);
  });
});
