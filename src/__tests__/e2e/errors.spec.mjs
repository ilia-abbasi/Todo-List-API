import "../../helpers/load_env.mjs";

import request from "supertest";
import mocks from "../../helpers/mocks.mjs";
import { createApp } from "../../app/app.mjs";

const app = createApp();

describe("general 404 errors", () => {
  it("should return 404 error on GET /non-existant/path", async () => {
    await request(app).get("/non-existant/path").expect(404);
  });

  it("should return 404 error on PUT /undefined/path", async () => {
    await request(app).put("/undefined/path").expect(404);
  });
});

describe("405 errors", () => {
  it("should get 405 error on DELETE /register", async () => {
    const response = await request(app).delete("/register");

    expect(response.statusCode).toEqual(405);
    expect(response.headers.allow).toEqual("POST");
  });

  it("should get 405 error on GET /login", async () => {
    const response = await request(app).get("/login");

    expect(response.statusCode).toEqual(405);
    expect(response.headers.allow).toEqual("POST");
  });

  it("should get 405 error on PATCH /todos", async () => {
    const response = await request(app)
      .patch("/todos")
      .set("Authorization", `Bearer ${mocks.immortalJWT}`);
    const allowedMethods = response.headers.allow.split(", ");

    expect(response.statusCode).toEqual(405);
    expect(allowedMethods.indexOf("POST")).not.toEqual(-1);
    expect(allowedMethods.indexOf("GET")).not.toEqual(-1);
  });

  it("should get 405 error on OPTIONS /todos/:todoId", async () => {
    const response = await request(app)
      .options("/todos/1")
      .set("Authorization", `Bearer ${mocks.immortalJWT}`);
    const allowedMethods = response.headers.allow.split(", ");

    expect(response.statusCode).toEqual(405);
    expect(allowedMethods.indexOf("PUT")).not.toEqual(-1);
    expect(allowedMethods.indexOf("DELETE")).not.toEqual(-1);
    expect(allowedMethods.indexOf("GET")).not.toEqual(-1);
  });
});
