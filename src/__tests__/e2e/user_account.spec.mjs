import "../../helpers/load_env.mjs";

import request from "supertest";
import db from "../../database/db.mjs";
import { createApp } from "../../app/app.mjs";
import mocks from "../../helpers/mocks.mjs";

const app = createApp();

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
        email: mocks.userData.email,
        password: mocks.userData.password,
      })
      .expect(400);

    await request(app)
      .post("/register")
      .send({
        name: 17,
        email: mocks.userData.email,
        password: mocks.userData.password,
      })
      .expect(400);

    await request(app)
      .post("/register")
      .send({
        name: "01234567890123456789012345678901234567890123456789a",
        email: mocks.userData.email,
        password: mocks.userData.password,
      })
      .expect(400);
  });

  it("should validate email", async () => {
    await request(app)
      .post("/register")
      .send({
        name: mocks.userData.name,
        email: "@doe.com",
        password: mocks.userData.password,
      })
      .expect(400);

    await request(app)
      .post("/register")
      .send({
        name: mocks.userData.name,
        email: "john@.com",
        password: mocks.userData.password,
      })
      .expect(400);

    await request(app)
      .post("/register")
      .send({
        name: mocks.userData.name,
        email: "jo hn@doe.com",
        password: mocks.userData.password,
      })
      .expect(400);

    await request(app)
      .post("/register")
      .send({
        name: mocks.userData.name,
        email: "john@doe@example.test",
        password: mocks.userData.password,
      })
      .expect(400);
  });

  it("should validate password", async () => {
    await request(app)
      .post("/register")
      .send({
        name: mocks.userData.name,
        email: mocks.userData.email,
        password: "abc",
      })
      .expect(400);

    await request(app)
      .post("/register")
      .send({
        name: mocks.userData.name,
        email: mocks.userData.email,
        password: "aaBB11!",
      })
      .expect(400);
  });
});

describe("registering a new user", () => {
  it("should successfully create a user with valid info", async () => {
    await request(app)
      .post("/register")
      .send({
        name: mocks.userData.name,
        email: mocks.userData.email,
        password: mocks.userData.password,
      })
      .expect(201);
  });

  it("should not create a user with duplicate email", async () => {
    await request(app)
      .post("/register")
      .send({
        name: "Doe John",
        email: mocks.userData.email,
        password: "!321CBAcba",
      })
      .expect(409);
  });
});

describe("successfully logging in", () => {
  it("should deny incorrect passwords", async () => {
    await request(app)
      .post("/login")
      .send({
        email: mocks.userData.email,
        password: "wrong_PASSWORD!1!1",
      })
      .expect(401);
  });

  it("should accept valid credentials", async () => {
    await request(app)
      .post("/login")
      .send({
        email: mocks.userData.email,
        password: mocks.userData.password,
      })
      .expect(200);
  });
});
