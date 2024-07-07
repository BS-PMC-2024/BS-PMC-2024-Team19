import React, { useState } from "react";
import "./SignUp.css";
import userEmail from "../../../assets/images/email.png";
import userName from "../../../assets/images/person.png";
import userPass from "../../../assets/images/password.png";

const SignUp = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={userName} alt="" />
            <input type="name" placeholder="Name" />
          </div>
        )}
        <div className="input">
          <img src={userEmail} alt="" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src={userPass} alt="" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forget-password">
          Forget Password? <span>Click Here</span>{" "}
        </div>
      )}
      <div className="sumbit-container">
        <div
          className={action === "Login" ? "sumbit gray" : "sumbit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "sumbit gray" : "sumbit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default SignUp;
