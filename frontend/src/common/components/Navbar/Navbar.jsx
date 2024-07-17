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
    navigate("/login");
    setNavToggle(false);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
    setNavToggle(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand fs-26">
        BestInvest
      </Link>
      <div className={`navbar-btns ${navToggle ? "show" : ""}`}>
        <button type="button" className="btn" onClick={handleLoginClick}>
          <IoMdRocket /> <span>Log In</span>
        </button>
        <button type="button" className="btn" onClick={handleSignUpClick}>
          <IoMdRocket /> <span>Sign Up</span>
        </button>
      </div>
      <div
        className={`hamburger-menu ${navToggle ? "hamburger-menu-change" : ""}`}
        onClick={navHandler}
      >
        <div className="bar-top"></div>
        <div className="bar-middle"></div>
        <div className="bar-bottom"></div>
      </div>
    </nav>
  );
};

export default Navbar;
