import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import Swal from "sweetalert2";
import "./Navbar.css";
import axios from "axios";
import { useAuth } from "../../../utils/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
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
  const handleClick = async (path) => {
    if (path === '/PremiumPage') {
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
  const handleLogoutClick = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        html: `<span style="font-size: 15px;">You will be logged out of your account.</span>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
        cancelButtonText: "No, cancel",
        customClass: {
          title: "swal-title",
          content: "swal-content",
          confirmButton: "swal-confirm-button",
          cancelButton: "swal-cancel-button",
        },
      });

      if (result.isConfirmed) {
        await axios.post(
          "http://localhost:6500/backend/auth/logout",
          {},
          { withCredentials: true }
        );
        logout(); // Call the context logout
        setUserInitial(""); // Clear the user initial
        localStorage.clear(); // Clear local storage if used
        sessionStorage.clear(); // Clear session storage if used
        navigate("/"); // Use navigate instead of window.location.href
      }
    } catch (err) {
      console.error("Failed to logout:", err);
    }
    handleMenuClose();
  };

  const handleStatisticsClick = () => {
    navigate("/userStatByAdmin");
    handleMenuClose();
  };

  const handleChangePasswordClick = () => {
    navigate("/update");
    handleMenuClose();
  };

  const handleUpdateQClick = () => {
    navigate("/UpdateQ");
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
                      MenuListProps={{ "aria-labelledby": "basic-button" }}
                    >
                      {user && user.isAdmin ? (
                        <div>
                          <MenuItem onClick={handleStatisticsClick}>
                            <Typography fontSize="1.4rem">
                              Statistics
                            </Typography>
                          </MenuItem>
                          <MenuItem onClick={handleChangePasswordClick}>
                            <Typography fontSize="1.4rem">
                              Change Password
                            </Typography>
                          </MenuItem>
                          <MenuItem onClick={handleUpdateQClick}>
                            <Typography fontSize="1.4rem">
                              Update Question
                            </Typography>
                          </MenuItem>

                          <MenuItem onClick={handleLogoutClick}>
                            <Typography fontSize="1.4rem">Logout</Typography>
                          </MenuItem>
                        </div>
                      ) : (
                        <div>
                          <MenuItem onClick={() => navigate("/profile")}>
                            <Typography fontSize="1.4rem">Account</Typography>
                          </MenuItem>
                          <MenuItem onClick={() => navigate("/portfolio")}>
                            <Typography fontSize="1.4rem">Portfolio</Typography>
                          </MenuItem>
                          <MenuItem onClick={() => handleClick("/PremiumPage")}>
                            <Typography fontSize="1.4rem">
                              Invest Info
                            </Typography>
                          </MenuItem>
                          <MenuItem onClick={handleLogoutClick}>
                            <Typography fontSize="1.4rem">Logout</Typography>
                          </MenuItem>
                        </div>
                      )}
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
