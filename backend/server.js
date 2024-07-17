import mysql from "mysql";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from './routes/auth.js';

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Use your local frontend URL
}));

app.use(cookieParser());

// Debugging route
app.get('/', (req, res) => {
    console.log("Root route hit");
    return res.json("from server side");
});

// Auth routes
app.use('/backend/auth', authRoutes);

// Port configuration
const PORT = 6500;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
