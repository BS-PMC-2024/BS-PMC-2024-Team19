import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { IoMdRocket } from "react-icons/io";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";

const Navbar = () => {
  const [navToggle, setNavToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName,setUserName] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    checkLoginStatus();
  }, [location]); // Run the effect whenever the location changes

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
  const getUserName = async ()=>{
    try{
      const response = await axios.get(
        "http://localhost:6500/backend/user/getUser",
        { withCredentials: true }
      );
      setUserName(response.data.fullName);
    } catch (err){
      console.log("failed to get userName status:",err)
      setUserName(null);
    }
  };
  useEffect(() => {
    getUserName();
  }, []);
  const navHandler = () => {
    setNavToggle((prevData) => !prevData);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLoginClick = () => {
    navigate("/login");
    setNavToggle(false);
  };
  const handleProfileClick = () => {
    navigate("/Profile");
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
      setIsLoggedIn(false);
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
                  <>
                    <button
                      id="basic-button"
                      type="button"
                      className="btn"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      <IoMdRocket /> <span>Hello {userName} </span>
                    </button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn"
                      onClick={handleLoginClick}
                    >
                      <IoMdRocket /> <span>Log In</span>
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={handleSignUpClick}
                    >
                      <IoMdRocket /> <span>Sign Up</span>
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
