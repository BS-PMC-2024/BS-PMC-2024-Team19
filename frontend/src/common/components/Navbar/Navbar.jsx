import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { IoMdRocket } from "react-icons/io";

const Navbar = () => {
  const [navToggle, setNavToggle] = useState(false);
  const navigate = useNavigate();

  const navHandler = () => {
    setNavToggle((prevData) => !prevData);
  };

  const handleLoginClick = () => {
    navigate("/signup?view=login");
    setNavToggle(false); // Close the navbar after navigation
  };

  const handleSignUpClick = () => {
    navigate("/signup?view=signup");
    setNavToggle(false); // Close the navbar after navigation
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
                <button
                  type="button"
                  className="btn"
                  onClick={handleLoginClick}
                >
                  <IoMdRocket /> <span>Log In</span>
                </button>
              </div>
              <div className="navbar-btns">
                <button
                  type="button"
                  className="btn"
                  onClick={handleSignUpClick}
                >
                  <IoMdRocket /> <span>Sign Up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
