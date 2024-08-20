import React, { useState, useEffect } from "react";
import axios from "axios";
import "./needHelp.css";

const NeedHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6500/backend/auth/getUserEmail",
          { withCredentials: true }
        );
        if (response.data.email) {
          setEmail(response.data.email);
        }
      } catch (error) {
        console.error("Failed to fetch user email:", error);
      }
    };

    fetchUserEmail();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:6500/backend/auth/helpRequest",
        { email, details },
        { withCredentials: true }
      );
      alert("Help request sent successfully.");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to send help request:", error);
      alert("Failed to send help request.");
    }
  };

  return (
    <>
      <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        💬
      </div>
      {isOpen && (
        <div className="help-request-form">
          <h4>Need Help?</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={email} readOnly />
            </div>
            <div className="form-group">
              <label>Details:</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default NeedHelp;
