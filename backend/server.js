import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = 6500;

app.use(cookieParser());
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Mount authRoutes under the '/backend/auth' path
app.use("/backend/auth", authRoutes);

// Sample root route for testing server connection
app.get("/", (req, res) => {
  return res.json("from server side");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
