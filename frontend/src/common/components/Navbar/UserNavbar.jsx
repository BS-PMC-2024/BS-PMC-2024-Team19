import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UserNavbar.css";

function UserNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="user-navbar">
      <ul>
        <li>
          <button
            className={`user-navbar-btn ${
              path === "/portfolio" ? "active" : ""
            }`}
            onClick={() => handleClick("/questionnaire")}
          >
            <span>Portfolio</span>
          </button>
        </li>
        <li>
          <button
            className={`user-navbar-btn ${
              path === "/invest-info" ? "active" : ""
            }`}
            onClick={() => handleClick("/PremiumPage")}
          >
            <span>Invest Info</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default UserNavbar;
