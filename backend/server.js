import mysql from "mysql";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import youtubeRoutes from "./routes/youtubeRoutes.js";
import nyInvestBorsaRoutes from "./routes/nyInvestBorsaRoutes.js";
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
app.use("/backend/user", userRoutes);
app.use("/backend/youtube", youtubeRoutes);
app.use("/backend/nyinvestborsa", nyInvestBorsaRoutes);
const PORT = 6500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
