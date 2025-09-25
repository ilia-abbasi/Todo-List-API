import request from "supertest";
import { createApp } from "../../app/app.mjs";

const app = createApp();

describe("general 404 errors", () => {
  it("should return 404 error on GET /non-existant/path", async () => {
    const response = await request(app).get("/non-existant/path");

    expect(response.statusCode).toEqual(404);
  });

  it("should return 404 error on PUT /undefined/path", async () => {
    const response = await request(app).put("/undefined/path");

    expect(response.statusCode).toEqual(404);
  });
});
