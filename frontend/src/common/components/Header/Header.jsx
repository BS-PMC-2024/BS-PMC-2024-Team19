import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.css";
import { FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header flex flex-center flex-column">
      <Navbar />
      <div className="container">
        <div className="header-content text-center flex flex-column">
          <h1 className="text-uppercase header-title">
            AI-Based Investment Management
          </h1>
          <p className="text-lead">
            Optimize and manage your investment portfolio with BestInvest.
            Leverage powerful AI tools for risk assessment, portfolio
            management, and performance tracking to efficiently allocate your
            capital.
          </p>
          <Link to="/signup?view=signup" className="btn header-btn btn-blue">
            <FaPaperPlane /> <span>get started</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
