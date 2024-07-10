import { db } from '../db/connect.js';
import bcrypt from "bcryptjs";

export const login = (req, res) => {
    // Your login logic here
};

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`fullName`,`email`, `password`,`isAdmin`) VALUES (?,?,?,?)";
        const values = [req.body.fullName,req.body.email ,hashedPassword, req.body.isAdmin];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created!");
        });
    });
};

export const logout = (req, res) => {
    // Your logout logic here
};
