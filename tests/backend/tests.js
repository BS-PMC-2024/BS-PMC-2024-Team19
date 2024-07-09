const request = require("supertest");
const app = require("../../backend/server"); // Assuming your server.js is named 'server.js'
const { expect } = require("chai");

describe("GET /", () => {
  it("should return Hello, World!", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal("Hello, World!");
        done();
      });
  });
});
