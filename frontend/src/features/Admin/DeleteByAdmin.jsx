import React, { useState } from "react";
import Navbar from "../../common/components/Navbar/Navbar";
import "./DeleteByAdmin.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const DeleteByAdmin = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:6500/backend/auth/deleteUserByAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAlertSeverity("success");
        setMessage("User deleted successfully");
        setEmail("");
      } else {
        setAlertSeverity("error");
        setMessage(data.error || "Failed to delete user");
      }
    } catch (error) {
      setAlertSeverity("error");
      setMessage("An error occurred while deleting the user");
    }
  };

  return (
    <div className="delete-by-admin-header-container">
      <Navbar />
      <div className="delete-by-admin-navbar-container"></div>

      <div className="delete-by-admin-content-container">
        <div className="delete-by-admin-textbox-container">
          <h2 className="delete-by-admin-delete-user-title">Delete User:</h2>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="delete-by-admin-textbox"
          />
          <button
            onClick={handleDelete}
            className="delete-by-admin-clear-button"
          >
            Delete
          </button>
          {message && (
            <Stack sx={{ width: "100%", marginTop: "10px" }} spacing={2}>
              <Alert severity={alertSeverity} sx={{ fontSize: "1rem" }}>
                {message}
              </Alert>
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteByAdmin;
