import React, { useState, useEffect } from "react";
import userEmail from "../../../assets/images/email.png";
import userName from "../../../assets/images/person.png";
import userPass from "../../../assets/images/password.png";
import "./SignUp.css";
import Checkbox from "@mui/material/Checkbox";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useLocation } from "react-router-dom";

const SignUp = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const view = queryParams.get("view");
  const [action, setAction] = useState(view === "login" ? "Login" : "Sign Up");
  const [showPassword, setShowPassword] = useState(false);

  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [signUpErrors, setSignUpErrors] = useState([]);
  const [loginErrors, setLoginErrors] = useState([]);

  useEffect(() => {
    setAction(view === "login" ? "Login" : "Sign Up");
  }, [view]);

  const handleChange = (e, isSignUp) => {
    if (isSignUp) {
      setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
    } else {
      setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newSignUpErrors = [];
    const newLoginErrors = [];

    if (action === "Sign Up") {
      if (!signUpFormData.name) {
        newSignUpErrors.push("Name is required");
      }
      if (!signUpFormData.email) {
        newSignUpErrors.push("Email is required");
      } else if (!/\S+@\S+\.\S+/.test(signUpFormData.email)) {
        newSignUpErrors.push("Email address is invalid");
      }
      if (!signUpFormData.password) {
        newSignUpErrors.push("Password is required");
      } else if (signUpFormData.password.length < 6) {
        newSignUpErrors.push("Password must be at least 6 characters long");
      }
    } else if (action === "Login") {
      if (!loginFormData.email) {
        newLoginErrors.push("Email is required");
      } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
        newLoginErrors.push("Email address is invalid");
      }
      if (!loginFormData.password) {
        newLoginErrors.push("Password is required");
      } else if (loginFormData.password.length < 6) {
        newLoginErrors.push("Password must be at least 6 characters long");
      }
    }

    setSignUpErrors(newSignUpErrors);
    setLoginErrors(newLoginErrors);

    return newSignUpErrors.length === 0 && newLoginErrors.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted successfully");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <div className="signup-text">{action}</div>
        <div className="signup-underline"></div>
      </div>
      <div className="signup-inputs">
        {action === "Sign Up" && (
          <>
            <div className="signup-input">
              <img src={userName} alt="User Name" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={signUpFormData.name}
                onChange={(e) => handleChange(e, true)}
              />
            </div>
            <div className="signup-input">
              <img src={userEmail} alt="User Email" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signUpFormData.email}
                onChange={(e) => handleChange(e, true)}
              />
            </div>
            <div className="signup-input">
              <img src={userPass} alt="User Password" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={signUpFormData.password}
                onChange={(e) => handleChange(e, true)}
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
          </>
        )}
        {action === "Login" && (
          <>
            <div className="signup-input">
              <img src={userEmail} alt="User Email" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginFormData.email}
                onChange={(e) => handleChange(e, false)}
              />
            </div>
            <div className="signup-input">
              <img src={userPass} alt="User Password" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={loginFormData.password}
                onChange={(e) => handleChange(e, false)}
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
          </>
        )}
        {action === "Sign Up" && signUpErrors.length > 0 && (
          <div className="signup-errors">
            {signUpErrors.map((error, index) => (
              <p key={index} className="error-text">
                {error}
              </p>
            ))}
          </div>
        )}
        {action === "Login" && loginErrors.length > 0 && (
          <div className="signup-errors">
            {loginErrors.map((error, index) => (
              <p key={index} className="error-text">
                {error}
              </p>
            ))}
          </div>
        )}
        {action === "Sign Up" && (
          <div className="premium-checkbox-container">
            <label className="premium-label">
              Want all the benefits? Join Now
            </label>
            <div className="premium-checkbox">
              <Checkbox size="large" />
              <span className="premium-text">Premium User</span>
            </div>
          </div>
        )}
      </div>
      {action === "Login" && (
        <div className="signup-forget-password">
          Forget Password? <span>Click Here</span>
        </div>
      )}
      <div className="signup-submit-container">
        <div className="signup-submit" onClick={handleSubmit}>
          {action}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
