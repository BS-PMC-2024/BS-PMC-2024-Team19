import React, { useState } from "react";
import userEmail from "../../../assets/images/email.png";
import userName from "../../../assets/images/person.png";
import userPass from "../../../assets/images/password.png";
import "./SignUp.css";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const SignUp = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const view = queryParams.get("view");
  const [action, setAction] = useState(view === "login" ? "Login" : "Sign Up");
  const [showPassword, setShowPassword] = useState(false);

  const [signUpFormData, setSignUpFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [signUpErrors, setSignUpErrors] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleChange = (e) => {
    setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newSignUpErrors = [];

    if (!signUpFormData.fullName.trim()) {
      newSignUpErrors.push("Full Name is required");
    }
    if (!signUpFormData.email.trim()) {
      newSignUpErrors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(signUpFormData.email)) {
      newSignUpErrors.push("Email address is invalid");
    }
    if (!signUpFormData.password.trim()) {
      newSignUpErrors.push("Password is required");
    } else if (signUpFormData.password.length < 6) {
      newSignUpErrors.push("Password must be at least 6 characters long");
    }

    setSignUpErrors(newSignUpErrors);
    return newSignUpErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:6500/backend/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signUpFormData),
          }
        );

        if (!response.ok) {
          if (response.status === 409) {
            const responseData = await response.json(); // Attempt to parse error response
            setAlertSeverity("error");
            setAlertMessage(
              responseData.error || "User with this email already exists"
            );
          } else {
            setAlertSeverity("error");
            setAlertMessage(`HTTP error! Status: ${response.status}`);
          }
          return;
        }

        const responseData = await response.json(); // Successful response
        setAlertSeverity("success");
        setAlertMessage("User registered successfully!");
        setSignUpFormData({
          fullName: "",
          email: "",
          password: "",
        });
        setSignUpErrors([]);

        // Optionally, redirect or update UI after successful registration
      } catch (error) {
        console.error("Error:", error.message);
        setAlertSeverity("error");
        setAlertMessage(error.message); // Display error message to the user
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <div className="signup-text">{action}</div>
        <div className="signup-underline"></div>
      </div>
      <form className="signup-inputs" onSubmit={handleSubmit}>
        <div className="signup-input">
          <img src={userName} alt="User Name" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={signUpFormData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="signup-input">
          <img src={userEmail} alt="User Email" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signUpFormData.email}
            onChange={handleChange}
          />
        </div>
        <div className="signup-input">
          <img src={userPass} alt="User Password" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={signUpFormData.password}
            onChange={handleChange}
          />
          {showPassword ? (
            <IoMdEye
              className="password-toggle"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <IoMdEyeOff
              className="password-toggle"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        {signUpErrors.length > 0 && (
          <div className="signup-errors">
            {signUpErrors.map((error, index) => (
              <p key={index} className="error-text">
                {error}
              </p>
            ))}
          </div>
        )}
        {alertMessage && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity={alertSeverity} sx={{ fontSize: "1.2rem" }}>
              {alertMessage}
            </Alert>
          </Stack>
        )}
        <div className="signup-submit-container">
          <button className="signup-submit" type="submit">
            {action}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
