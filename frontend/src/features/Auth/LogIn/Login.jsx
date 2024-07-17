import React, { useState } from "react";
import userEmail from "../../../assets/images/email.png";
import userPass from "../../../assets/images/password.png";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newLoginErrors = [];

    if (!loginFormData.email.trim()) {
      newLoginErrors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
      newLoginErrors.push("Email address is invalid");
    }
    if (!loginFormData.password.trim()) {
      newLoginErrors.push("Password is required");
    }

    setLoginErrors(newLoginErrors);
    return newLoginErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:6500/backend/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginFormData),
            credentials: 'include',
          }
        );

        if (!response.ok) {
          const responseData = await response.json();
          setAlertSeverity("error");
          setAlertMessage(responseData.error || "Login failed!");
          return;
        }

        setAlertSeverity("success");
        setAlertMessage("Login successful!");
        navigate("/update");
        setLoginFormData({ email: "", password: "" });
        setLoginErrors([]);
      } catch (error) {
        setAlertSeverity("error");
        setAlertMessage("An error occurred during login.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-text">Login</div>
        <div className="login-underline"></div>
      </div>
      <form className="login-inputs" onSubmit={handleSubmit}>
        <div className="login-input">
          <img src={userEmail} alt="User Email" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginFormData.email}
            onChange={handleChange}
          />
        </div>
        <div className="login-input">
          <img src={userPass} alt="User Password" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={loginFormData.password}
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
        {loginErrors.length > 0 && (
          <div className="login-errors">
            {loginErrors.map((error, index) => (
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
        <div className="login-submit-container">
          <button className="login-submit" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
