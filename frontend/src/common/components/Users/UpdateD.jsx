import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../Users/UpdateD.css";

const UpdateD = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lengthError, setLengthError] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      setLengthError("Password must be at least 6 characters long");
      setErrorMessage("");
    } else if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLengthError("");
    } else {
      setErrorMessage("");
      setLengthError("");
      // Handle password change logic here
    }
  };

  return (
    <div className="Update">
      <Navbar />

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password:</label>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="oldPassword"
              name="oldPassword"
            />
            {showPassword ? (
              <VisibilityOffIcon
                className="toggle-password"
                onClick={toggleShowPassword}
              />
            ) : (
              <RemoveRedEyeIcon
                className="toggle-password"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {showPassword ? (
              <VisibilityOffIcon
                className="toggle-password"
                onClick={toggleShowPassword}
              />
            ) : (
              <RemoveRedEyeIcon
                className="toggle-password"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showPassword ? (
              <VisibilityOffIcon
                className="toggle-password"
                onClick={toggleShowPassword}
              />
            ) : (
              <RemoveRedEyeIcon
                className="toggle-password"
                onClick={toggleShowPassword}
              />
            )}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {lengthError && <p className="error-message">{lengthError}</p>}
        </div>
        <div className="button-and-checkbox">
          <button
            type="button"
            className="change-password-button"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateD;
