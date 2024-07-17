import { db } from "../db/connect.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  const { fullName, email, password, isPrime } = req.body;

  console.log("Received user data:", req.body);

  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error("DB Check Email Error:", err);
      return res.status(500).json({ error: "Failed to check email" });
    }

    if (results.length > 0) {
      console.log("Email already exists:", email);
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const isPrimeValue = isPrime ? 1 : 0;

    console.log("Inserting user with values:", {
      fullName,
      email,
      hashedPassword,
      isPrime: isPrimeValue,
    });

    const insertQuery =
      "INSERT INTO users (fullName, email, password, isAdmin, isPrime) VALUES (?, ?, ?, ?, ?)";
    db.query(
      insertQuery,
      [fullName, email, hashedPassword, 0, isPrimeValue],
      (insertErr, result) => {
        if (insertErr) {
          console.error("DB Insert Error:", insertErr);
          if (insertErr.code === "ER_DUP_ENTRY") {
            return res
              .status(409)
              .json({ error: "User with this email already exists" });
          }
          return res.status(500).json({ error: "Failed to register user" });
        }
        console.log("User registered successfully");
        return res
          .status(200)
          .json({ message: "User registered successfully" });
      }
    );
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  console.log("Received login data:", req.body);

  const getUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(getUserQuery, [email], (err, results) => {
    if (err) {
      console.error("DB Get User Error:", err);
      return res.status(500).json({ error: "Failed to get user" });
    }

    if (results.length === 0) {
      console.log("User not found:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    console.log("Password to compare:", password);
    console.log("Hashed password from DB:", user.password);

    // Compare the input password with the stored hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    console.log("Is password valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("User logged in successfully:", email);
    return res.status(200).json({ message: "Login successful" });
  });
};

export const logout = (req, res) => {
  // Your logout logic here
};

//////////////////Admin/////////////////

export const deleteUserByAdmin = (req, res) => {
  const { email } = req.body;

  console.log("Received request to delete user with email:", email);

  const deleteUserQuery = "DELETE FROM users WHERE email = ?";
  db.query(deleteUserQuery, [email], (err, result) => {
    if (err) {
      console.error("DB Delete User Error:", err);
      return res.status(500).json({ error: "Failed to delete user" });
    }

    if (result.affectedRows === 0) {
      console.log("User not found for deletion:", email);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User deleted successfully:", email);
    return res.status(200).json({ message: "User deleted successfully" });
  });
};
