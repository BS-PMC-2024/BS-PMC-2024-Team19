import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UserNavbar.css";

function UserNavbar() {

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const handleClick = async (path) => {
    if (path === '/portfolio') {
      navigate(path);
    } else if (path === '/PremiumPage') {
      try {
        const response = await fetch('http://localhost:6500/backend/user/statusIsPrime', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // This ensures that cookies (like accessToken) are sent with the request
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        const { isPrime } = data;
  
        if (isPrime) {
          navigate("/PremiumPage");
        } else {
          navigate("/NonPremiumInfo");
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        // Handle the error or redirect to a default page
      }
    }
  };

  return (
    <nav className="user-navbar">
      <ul>
        <li>
          <button
            className={`user-navbar-btn ${
              path === "/portfolio" ? "active" : ""
            }`}
            onClick={() => handleClick("/portfolio")}
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
