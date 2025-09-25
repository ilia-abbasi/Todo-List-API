import request from "supertest";
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
});
