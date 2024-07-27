const request = require("supertest");
const app = require("../frontend/src/App"); // Your Express app

describe("GET /api/example", () => {
  it("should return a 200 status and a JSON object", async () => {
    const res = await request(app).get("/api/example");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
