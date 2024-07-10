import mysql from "mysql";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from './routes/auth.js';

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.get('/', (req, res) => {
    return res.json("from server side");
});

app.use('/backend/auth', authRoutes);

const PORT = 6500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
