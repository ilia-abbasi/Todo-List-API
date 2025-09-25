import "../../helpers/load_env.mjs";

import request from "supertest";
import db from "../../database/db.mjs";
import { createApp } from "../../app/app.mjs";
import mocks from "../../helpers/mocks.mjs";

const app = createApp();
let jwtJohn;
let jwtBob;
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

    jwtJohn = response.body.data.token;
  });

  it("should check the JWT when creating a todo item", async () => {
    await request(app).post("/todos").send(mocks.todoData).expect(401);
  });

  it("should successfully create a todo item", async () => {
    await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${jwtJohn}`)
      .send(mocks.todoData)
      .expect(201);
  });
});

describe("Bob registers and creates a todo item", () => {
  it("should register successfully", async () => {
    const response = await request(app).post("/register").send({
      name: mocks.userDataBob.name,
      email: mocks.userDataBob.email,
      password: mocks.userDataBob.password,
    });

    expect(response.statusCode).toEqual(201);

    jwtBob = response.body.data.token;
  });

  it("should check the JWT when creating a todo item", async () => {
    await request(app).post("/todos").send(mocks.todoData).expect(401);
  });

  it("should successfully create a todo item", async () => {
    await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${jwtBob}`)
      .send(mocks.todoData)
      .expect(201);
  });
});
