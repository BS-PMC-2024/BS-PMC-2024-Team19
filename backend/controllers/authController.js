import { db } from "../db/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  "5e9ba789dad13b96a81107721f15dc563f879454b5368be1c798ecf852e49c63fe5d8a33b0fa3747f2bd243967640ff36e5969c3d223075c0acad4daa8473c22";

// register function
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

//connect function
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

    const token = jwt.sign(
      { email: data[0].email, isAdmin: data[0].isAdmin },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const { password, ...others } = data[0];
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json({ ...others, token });
  });
};
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

export const checkAuthStatus = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.json({ loggedIn: false });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.json({ loggedIn: false });
    }

    const email = user.email;
    // Modify the query to select `isAdmin` and `isPrime` fields
    const getUserQuery =
      "SELECT fullName, isAdmin, isPrime FROM users WHERE email = ?";
    db.query(getUserQuery, [email], (dbErr, results) => {
      if (dbErr) {
        console.error("DB Get User Error:", dbErr);
        return res.json({ loggedIn: false });
      }

      if (results.length === 0) {
        return res.json({ loggedIn: false });
      }

      const userName = results[0].fullName;
      const isAdmin = results[0].isAdmin;
      const isPrime = results[0].isPrime;

      // Include `isAdmin` and `isPrime` in the response
      return res.json({
        loggedIn: true,
        name: userName,
        isAdmin: isAdmin, // true or false
        isPrime: isPrime, // true or false
      });
    });
  });
};
// Check if email exists in the database
export const checkEmailExists = (req, res) => {
  const { email } = req.body;

  console.log("Checking if email exists:", email);

  // SQL query to check if the email exists in the database
  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error("DB Check Email Error:", err);
      // Respond with a 500 status code and error message if there is a database error
      return res.status(500).json({ error: "Failed to check email" });
    }

    // Check if the results contain any records with the specified email
    if (results.length > 0) {
      // Email exists in the database
      return res.status(409).json({ error: "Email already exists" });
    }

    // Email does not exist in the database
    console.log("Email is available");
    return res.status(200).json({ message: "Email is available" });
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

//delete user by admin
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

//change password function for user
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.email) {
      return res
        .status(401)
        .json({ error: "Unauthorized, email not found in token" });
    }

    const getUserQuery = "SELECT password FROM users WHERE email = ?";
    db.query(getUserQuery, [decoded.email], (err, results) => {
      if (err) {
        console.error("DB Get User Error:", err);
        return res.status(500).json({ error: "Failed to retrieve user data" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const hashedOldPassword = results[0].password;

      const isPasswordMatch = bcrypt.compareSync(
        oldPassword,
        hashedOldPassword
      );
      if (!isPasswordMatch) {
        return res.status(400).json({ error: "Old password is incorrect" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

      const updatePasswordQuery =
        "UPDATE users SET password = ? WHERE email = ?";
      db.query(
        updatePasswordQuery,
        [hashedNewPassword, decoded.email],
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
    });
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ error: "Unauthorized, invalid token" });
  }
};

export const getAllUsers = (req, res) => {
  const getUsersQuery = "SELECT  fullName, email, isPrime FROM users";

  db.query(getUsersQuery, (err, results) => {
    if (err) {
      console.error("DB Get Users Error:", err);
      return res.status(500).json({ error: "Failed to retrieve users" });
    }

    return res.status(200).json({ users: results });
  });
};

export const updateUserStatus = (req, res) => {
  const { email, isPrime } = req.body;

  console.log(
    "Received request to update user status with email:",
    email,
    "to isPrime:",
    isPrime
  );

  const updateStatusQuery = "UPDATE users SET isPrime = ? WHERE email = ?";
  db.query(updateStatusQuery, [isPrime, email], (err, result) => {
    if (err) {
      console.error("DB Update User Status Error:", err);
      return res.status(500).json({ error: "Failed to update user status" });
    }
    if (result.affectedRows === 0) {
      console.log("User not found for status update:", email);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User status updated successfully:", email);
    return res
      .status(200)
      .json({ message: "User status updated successfully" });
  });
};

export const submitQuestionnaire = async (req, res) => {
  const { answers } = req.body; // answers should be an object with Q1 to Q10 properties
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, no token provided" });
  }

  try {
    // Verify the JWT token and extract the user's email
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.email) {
      return res
        .status(401)
        .json({ error: "Unauthorized, email not found in token" });
    }

    // Destructure answers object
    const { Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10 } = answers;

    // Validate that all questions have been answered
    if (!Q1 || !Q2 || !Q3 || !Q4 || !Q5 || !Q6 || !Q7 || !Q8 || !Q9 || !Q10) {
      return res.status(400).json({ error: "All questions must be answered" });
    }

    // First, count the number of existing records for this user's email
    const countQuery =
      "SELECT COUNT(*) AS count FROM QUESTIONNAIRE WHERE Email = ?";
    db.query(countQuery, [decoded.email], (countErr, countResult) => {
      if (countErr) {
        console.error("DB Count Error:", countErr);
        return res
          .status(500)
          .json({ error: "Failed to count previous entries" });
      }

      const num = countResult[0].count + 1; // Increment by 1 to get the current submission number

      // Insert or update the questionnaire record
      const insertQuery = `
        INSERT INTO QUESTIONNAIRE (Email, Num, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(
        insertQuery,
        [decoded.email, num, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10],
        (insertErr, result) => {
          if (insertErr) {
            console.error("DB Insert Error:", insertErr);
            return res
              .status(500)
              .json({ error: "Failed to save questionnaire data" });
          }

          return res
            .status(200)
            .json({ message: "Questionnaire submitted successfully" });
        }
      );
    });
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ error: "Unauthorized, invalid token" });
  }
};
export const getUserEmail = (req, res) => {
  try {
    const token = req.cookies.accessToken; // Assuming the token is in cookies

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.email) {
      console.log("Unauthorized, email not found in token");
      return res
        .status(401)
        .json({ error: "Unauthorized, email not found in token" });
    }

    res.json({ email: decoded.email });
  } catch (error) {
    console.error("Error fetching user email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const submitHelpRequest = async (req, res) => {
  try {
    const { email, details } = req.body;

    if (!email || !details) {
      return res.status(400).json({ error: "Email and details are required" });
    }

    const query = "INSERT INTO HELP_REQUEST (email, details) VALUES (?, ?)";
    await db.query(query, [email, details]);
    res.status(200).json({ message: "Help request submitted successfully" });
  } catch (error) {
    console.error("Failed to submit help request:", error);
    res.status(500).json({ error: "Failed to submit help request" });
  }
};

export const getUserProfile = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, no token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized, invalid token" });
    }

    const email = decoded.email;

    const getUserQuery =
      "SELECT fullName, email, isPrime FROM users WHERE email = ?";
    db.query(getUserQuery, [email], (err, results) => {
      if (err) {
        console.error("DB Get User Error:", err);
        return res.status(500).json({ error: "Failed to retrieve user data" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ user: results[0] });
    });
  });
};

export const getAllQuestions = (req, res) => {
  const getQuestionsQuery = "SELECT * FROM questions"; // הנח שאתה מחפש את כל השאלות

  db.query(getQuestionsQuery, (err, results) => {
    if (err) {
      console.error("DB Get Questions Error:", err);
      return res.status(500).json({ error: "Failed to retrieve questions" });
    }

    return res.status(200).json({ questions: results });
  });
};

export const updateQuestions = (req, res) => {
  const { id, question_text } = req.body;

  console.log("Received ID:", id);
  console.log("Received Question Text:", question_text);

  if (!id || !question_text) {
    return res.status(400).json({ error: "ID and question_text are required" });
  }

  const updateQuestionQuery =
    "UPDATE questions SET question_text = ? WHERE id = ?";

  db.query(updateQuestionQuery, [question_text, id], (err, result) => {
    if (err) {
      console.error("DB Update Question Error:", err);
      return res.status(500).json({ error: "Failed to update question" });
    }

    if (result.affectedRows === 0) {
      console.log("Question not found for update:", id);
      return res.status(404).json({ error: "Question not found" });
    }

    console.log("Question updated successfully:", id);
    return res.status(200).json({ message: "Question updated successfully" });
  });
};
