import React, { useState } from "react";
import NavbarA from "../NavbarA/NavbarA";
import "./HeaderA.css";

const HeaderA = () => {
  const [text, setText] = useState("");

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="header-container">
      <div className="navbar-container">
        <NavbarA />
      </div>

      <div className="content-container">
        <h2 className="delete-user-title">delete user:</h2>
        <div className="textbox-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Email"
            className="textbox"
          />
          <button onClick={handleClear} className="clear-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderA;
