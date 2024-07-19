import { db } from "../db/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  "5e9ba789dad13b96a81107721f15dc563f879454b5368be1c798ecf852e49c63fe5d8a33b0fa3747f2bd243967640ff36e5969c3d223075c0acad4daa8473c22";

// פונקציה לרישום משתמשים
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

// פונקציה להתחברות
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword) return res.status(404).json("Wrong password or email");

    // השתמש ב-JWT_SECRET בעת יצירת הטוקן
    const token = jwt.sign({ email: data[0].email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password, ...others } = data[0];
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json(others);
  });
};

// פונקציה ליציאה
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    })
    .status(200)
    .json("User has been logged out.");
};

// פונקציה לבדוק סטטוס התחברות
export const checkAuthStatus = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.json({ loggedIn: false });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.json({ loggedIn: false });
    }

    return res.json({ loggedIn: true });
  });
};

export const clearCookies = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    })
    .status(200)
    .json("Cookies cleared.");
};

//////////////////Admin/////////////////

// פונקציה למחיקת משתמש על ידי מנהל
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

// פונקציה לשינוי סיסמא
export const changePassword = async (req, res) => {
  const { newPassword } = req.body;

  // קרא את ה-token מהבקשה
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, no token provided" });
  }

  try {
    // פענח את ה-token
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.email) {
      return res
        .status(401)
        .json({ error: "Unauthorized, email not found in token" });
    }

    // הצפן את הסיסמה החדשה עם bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    // אם ה-token תקין, בצע שינוי סיסמה
    const updatePasswordQuery = "UPDATE users SET password = ? WHERE email = ?";
    db.query(
      updatePasswordQuery,
      [hashedPassword, decoded.email],
      (err, result) => {
        if (err) {
          console.error("DB Update Password Error:", err);
          return res.status(500).json({ error: "Failed to update password" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        return res
          .status(200)
          .json({ message: "Password updated successfully" });
      }
    );
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ error: "Unauthorized, invalid token" });
  }
};
