import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../Users/UpdateD.css";

const UpdateD = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lengthError, setLengthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const clearMessages = () => {
    setErrorMessage("");
    setLengthError("");
    setSuccessMessage("");
  };

  const handleChangePassword = async () => {
    clearMessages();

    if (newPassword.length < 6) {
      setLengthError("Password must be at least 6 characters long");
    } else if (newPassword === oldPassword) {
      setErrorMessage("New password cannot be the same as the old password");
    } else if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      try {
        const response = await fetch(
          "http://localhost:6500/backend/auth/changePassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ oldPassword, newPassword }),
            credentials: "include",
          }
        );

        if (response.ok) {
          setSuccessMessage("Password updated successfully");
        } else {
          const result = await response.json();
          setErrorMessage(result.error || "Failed to update password");
        }
      } catch (error) {
        setErrorMessage("Failed to update password");
      }
    }
  };

  return (
    <div className="Update">
      <Navbar />

      <div className="form-container-update">
        <div className="form-group-update">
          <label htmlFor="oldPassword">Old Password:</label>
          <div className="input-container-update">
            <input
              type={showPassword ? "text" : "password"}
              id="oldPassword"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {showPassword ? (
              <VisibilityOffIcon
                className="toggle-password-update"
                onClick={toggleShowPassword}
              />
            ) : (
              <RemoveRedEyeIcon
                className="toggle-password-update"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        </div>
        <div className="form-group-update">
          <label htmlFor="newPassword">New Password:</label>
          <div className="input-container-update">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {showPassword ? (
              <VisibilityOffIcon
                className="toggle-password-update"
                onClick={toggleShowPassword}
              />
            ) : (
              <RemoveRedEyeIcon
                className="toggle-password-update"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        </div>
        <div className="form-group-update">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="input-container-update">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showPassword ? (
              <VisibilityOffIcon
                className="toggle-password-update"
                onClick={toggleShowPassword}
              />
            ) : (
              <RemoveRedEyeIcon
                className="toggle-password-update"
                onClick={toggleShowPassword}
              />
            )}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {lengthError && <p className="error-message">{lengthError}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>
        <div className="button-and-checkbox-update">
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
