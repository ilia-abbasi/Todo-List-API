import "../../helpers/load_env.mjs";

import request from "supertest";
import db from "../../database/db.mjs";
import { createApp } from "../../app/app.mjs";
import mocks from "../../helpers/mocks.mjs";

const app = createApp();
let jwt = "";
let todoData;

db.initializePool({ test: true });

afterAll(async () => {
  await db.clearTables();
  await db.endPool();
});

describe("registering and creating a todo item", () => {
  it("should register successfully", async () => {
    const response = await request(app).post("/register").send({
      name: mocks.userData.name,
      email: mocks.userData.email,
      password: mocks.userData.password,
    });

    expect(response.statusCode).toEqual(201);

    jwt = response.body.data.token;
  });
});
