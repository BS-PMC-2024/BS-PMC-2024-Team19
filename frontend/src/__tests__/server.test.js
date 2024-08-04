import request from "supertest";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "../../../backend/routes/userRoutes";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.get("/", (req, res) => {
  console.log("Root route hit");
  return res.json("from server side");
});
app.use("/backend/auth", authRoutes);

describe("Test the root path", () => {
  it("should respond with a 200 status code and message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe("from server side");
  });
});

// describe("Test /backend/auth route", () => {
//   it("should respond to a POST request", async () => {
//     const res = await request(app).post("/backend/auth").send({
//       // provide necessary data for auth route
//     });
//     expect(res.statusCode).toBe(200); // or whatever status you expect
//     // add more assertions based on your route's response
//   });
// });
