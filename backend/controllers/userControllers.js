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
//update email
export const updateEmail = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });
  
    const { email } = req.body;
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userEmail = decoded.email;
  
      const query = 'UPDATE users SET email = ? WHERE email = ?';
      db.query(query, [email, userEmail], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to update email' });
  
        return res.status(200).json({ message: 'Email updated successfully' });
      });
    } catch (error) {
      return res.status(400).json({ error: 'Invalid token' });
    }
  };



  export const togglePremium = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });
  
    const { isPremium } = req.body;
    console.log(isPremium);
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userEmail = decoded.email;
  
      const query = 'UPDATE users SET isPrime = ? WHERE email = ?';
      db.query(query, [isPremium, userEmail], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Failed to update user status' });
        }
        console.log(isPremium);
        console.log('Database update results:', results);
        return res.status(200).json({ message: 'User status updated successfully' });
      });
    } catch (error) {
      console.error('Token error:', error);
      return res.status(400).json({ error: 'Invalid token' });
    }
  };
  export const getUserStatus = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userEmail = decoded.email;
  
      const query = 'SELECT isPrime FROM users WHERE email = ?';
      db.query(query, [userEmail], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Failed to retrieve user status' });
        }
  
        if (results.length > 0) {
          const isPrime = results[0].isPrime;
          return res.status(200).json({ isPremium: isPrime });
        } else {
          return res.status(404).json({ error: 'User not found' });
        }
      });
    } catch (error) {
      console.error('Token error:', error);
      return res.status(400).json({ error: 'Invalid token' });
    }
  };

  export const deleteUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userEmail = decoded.email;
  
      const query = 'DELETE FROM users WHERE email = ?';
      db.query(query, [userEmail], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Failed to delete user' });
        }
        console.log("test delete!");
        return res.status(200).json({ message: 'User deleted successfully' });
      });
    } catch (error) {
      console.error('Token error:', error);
      return res.status(400).json({ error: 'Invalid token' });
    }
  };

