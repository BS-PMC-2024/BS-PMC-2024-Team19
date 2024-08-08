import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { blue } from "@mui/material/colors";
import "./Navbar.css";
import axios from "axios";

const Navbar = ({ onLogout }) => {
  const [navToggle, setNavToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userInitial, setUserInitial] = useState("");
  const [userName, setUserName] = useState("");
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
      if (response.data.loggedIn && response.data.name) {
        setUserInitial(response.data.name.charAt(0).toUpperCase()); // Set the user's initial
        setUserName(response.data.name); // Set the user's full name
      }
    } catch (err) {
      console.error("Failed to check login status:", err);
      setIsLoggedIn(false);
    }
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
    handleMenuClose();
  };

  const handleAccountClick = () => {
    navigate("/profile");
    handleMenuClose();
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
              onClick={() => setNavToggle((prev) => !prev)}
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
                  <>
                    <Avatar
                      sx={{
                        bgcolor: blue[500],
                        cursor: "pointer",
                        width: 50, // Adjust the width
                        height: 50, // Adjust the height
                        fontSize: "1.8rem", // Adjust the font size to fit the circle
                      }}
                      alt="User Avatar"
                      onClick={handleAvatarClick}
                    >
                      {userInitial}
                    </Avatar>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleAccountClick}>Account</MenuItem>
                      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => navigate("/login")}
                    >
                      Log In
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => navigate("/signup")}
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
