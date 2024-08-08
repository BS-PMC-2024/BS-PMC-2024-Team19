import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

const Navbar = ({ onLogout }) => {
  const [navToggle, setNavToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkLoginStatus();
  }, [location]);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6500/backend/auth/status",
        { withCredentials: true }
      );
      setIsLoggedIn(response.data.loggedIn);
    } catch (err) {
      console.error("Failed to check login status:", err);
      setIsLoggedIn(false);
    }
  };

  const navHandler = () => {
    setNavToggle((prevData) => !prevData);
  };

  const handleLoginClick = () => {
    navigate("/login");
    setNavToggle(false);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
    setNavToggle(false);
  };

  const handleLogoutClick = async () => {
    try {
      await axios.post(
        "http://localhost:6500/backend/auth/logout",
        {},
        { withCredentials: true }
      );
      onLogout(); // Notify parent about logout
      navigate("/");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <nav className="navbar w-100 flex">
      <div className="container w-100">
        <div className="navbar-content flex fw-7">
          <div className="brand-and-toggler flex flex-between w-100">
            <Link to="/" className="navbar-brand fs-26">
              BestInvest
            </Link>
            <div
              type="button"
              className={`hamburger-menu ${
                navToggle ? "hamburger-menu-change" : ""
              }`}
              onClick={navHandler}
            >
              <div className="bar-top"></div>
              <div className="bar-middle"></div>
              <div className="bar-bottom"></div>
            </div>
          </div>

          <div
            className={`navbar-collapse ${
              navToggle ? "show-navbar-collapse" : ""
            }`}
          >
            <div className="navbar-collapse-content">
              <div className="navbar-btns">
                {isLoggedIn ? (
                  <button
                    type="button"
                    className="btn"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn"
                      onClick={handleLoginClick}
                    >
                      Log In
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={handleSignUpClick}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
