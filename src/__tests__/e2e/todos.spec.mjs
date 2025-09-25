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
let UpdatedTodoData = {
  title: "[NEW] Clean room",
  description: "[NEW] Use a broom to clean the bedroom",
};

db.initializePool({ test: true });

afterAll(async () => {
  await db.clearTables();
  await db.endPool();
});

describe("John and Bob register and create a todo item", () => {
  it("should register successfully", async () => {
    const responseJohn = await request(app).post("/register").send({
      name: mocks.userDataJohn.name,
      email: mocks.userDataJohn.email,
      password: mocks.userDataJohn.password,
    });
    const responseBob = await request(app).post("/register").send({
      name: mocks.userDataBob.name,
      email: mocks.userDataBob.email,
      password: mocks.userDataBob.password,
    });

    expect(responseJohn.statusCode).toEqual(201);
    expect(responseBob.statusCode).toEqual(201);

    jwtJohn = responseJohn.body.data.token;
    jwtBob = responseBob.body.data.token;
  });

  it("should check the JWT when creating a todo item", async () => {
    await request(app).post("/todos").send(mocks.todoData).expect(401);
  });

  it("should successfully create a todo item", async () => {
    const responseJohn = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${jwtJohn}`)
      .send(mocks.todoData);
    const responseBob = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${jwtBob}`)
      .send(mocks.todoData);

    expect(responseJohn.statusCode).toEqual(201);
    expect(responseBob.statusCode).toEqual(201);

    todoDataJohn = responseJohn.body.data;
    todoDataBob = responseBob.body.data;
  });
});

describe("John tries to update the todo items", () => {
  it("should fail in updating Bob's todo item", async () => {
    await request(app)
      .put(`/todos/${todoDataBob.todo_id}`)
      .set("Authorization", `Bearer ${jwtJohn}`)
      .send(UpdatedTodoData)
      .expect(403);
  });

  it("should succeed in updating his todo item", async () => {
    await request(app)
      .put(`/todos/${todoDataJohn.todo_id}`)
      .set("Authorization", `Bearer ${jwtJohn}`)
      .send(UpdatedTodoData)
      .expect(200);
  });
});
