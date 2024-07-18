import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { IoMdRocket } from "react-icons/io";
import axios from "axios";

const Navbar = () => {
  const [navToggle, setNavToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

 
  useEffect(() => {
    // Clear cookies when the component mounts
    clearCookies();

    // Check login status after clearing cookies
    checkLoginStatus();
  }, []);

  const clearCookies = () => {
    // Clear the accessToken cookie
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("http://localhost:6500/backend/auth/status", { withCredentials: true });
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
    clearCookies();
    setNavToggle(false);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
    clearCookies();
    setNavToggle(false);
  };

  const handleLogoutClick = async () => {
    try {
      await axios.post("http://localhost:6500/backend/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      clearCookies();
      navigate("/"); // Redirect to the home page after logout
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
              {isLoggedIn ? (
                <div className="navbar-btns">
                  <button type="button" className="btn" onClick={handleLogoutClick}>
                    <IoMdRocket /> <span>Logout</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="navbar-btns">
                    <button type="button" className="btn" onClick={handleLoginClick}>
                      <IoMdRocket /> <span>Log In</span>
                    </button>
                  </div>
                  <div className="navbar-btns">
                    <button type="button" className="btn" onClick={handleSignUpClick}>
                      <IoMdRocket /> <span>Sign Up</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
