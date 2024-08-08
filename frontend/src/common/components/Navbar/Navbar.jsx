import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { blue } from "@mui/material/colors";
import "./Navbar.css";
import axios from "axios";
import { useAuth } from "../../../utils/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const [navToggle, setNavToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userInitial, setUserInitial] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const checkLoginStatus = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:6500/backend/auth/status",
        { withCredentials: true }
      );
      if (response.data.loggedIn && response.data.name) {
        setUserInitial(response.data.name.charAt(0).toUpperCase());
      } else {
        setUserInitial("");
      }
    } catch (err) {
      console.error("Failed to check login status:", err);
      setUserInitial("");
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus, location]);

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
      logout(); // Call the context logout
      setUserInitial("");
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

  const handlePortfolioClick = () => {
    navigate("/portfolio");
    handleMenuClose();
  };

  const handleInvestInfoClick = () => {
    navigate("/invest-info");
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
                {userInitial ? (
                  <>
                    <Avatar
                      sx={{
                        bgcolor: blue[500],
                        cursor: "pointer",
                        width: 50,
                        height: 50,
                        fontSize: "1.8rem",
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
                      <MenuItem onClick={handlePortfolioClick}>
                        Portfolio
                      </MenuItem>
                      <MenuItem onClick={handleInvestInfoClick}>
                        Invest Info
                      </MenuItem>
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
