import { db } from "../db/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  "5e9ba789dad13b96a81107721f15dc563f879454b5368be1c798ecf852e49c63fe5d8a33b0fa3747f2bd243967640ff36e5969c3d223075c0acad4daa8473c22";


export const getUser = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ error: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userEmail = decoded.email;

        const query = "SELECT fullName FROM users WHERE email = ?";
        db.query(query, [userEmail], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "Failed to retrieve user data" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ fullName: results[0].fullName });
        });
    } catch (ex) {
        return res.status(400).json({ error: "Invalid token" });
    }
};

