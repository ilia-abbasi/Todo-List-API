import "../../helpers/load_env.mjs";

import request from "supertest";
import db from "../../database/db.mjs";
import { createApp } from "../../app/app.mjs";
import mocks from "../../helpers/mocks.mjs";

const app = createApp();
let jwt = "";
let todoDataJohn;
let todoDataBob;
let UpdatedTodoDataJohn;

db.initializePool({ test: true });

afterAll(async () => {
  await db.clearTables();
  await db.endPool();
});

describe("John registers and creates a todo item", () => {
  it("should register successfully", async () => {
    const response = await request(app).post("/register").send({
      name: mocks.userDataJohn.name,
      email: mocks.userDataJohn.email,
      password: mocks.userDataJohn.password,
    });

    expect(response.statusCode).toEqual(201);

    jwt = response.body.data.token;
  });

  it("should check the JWT when creating a todo item", async () => {
    await request(app).post("/todos").send(mocks.todoData).expect(401);
  });

  it("should successfully create a todo item", async () => {
    await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${jwt}`)
      .send(mocks.todoData)
      .expect(201);
  });
});
