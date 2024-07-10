import React, { useState } from "react";
import Navbar from "../../common/components/Navbar/Navbar";
import "./HeaderA.css";

const HeaderA = () => {
  const [text, setText] = useState("");

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="header-container">
      <Navbar />
      <div className="navbar-container"></div>

      <div className="content-container">
        <div className="textbox-container">
          <h2 className="delete-user-title">delete user:</h2>
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
