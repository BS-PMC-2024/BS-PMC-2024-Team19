import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./features/HomePage/HomePage";
import Navbar from "./common/components/Navbar/Navbar";
import Footer from "./common/components/Footer/Footer";
import UpdateD from "./common/components/Users/UpdateD";
import SignUp from "./features/Auth/SignUp/SignUp";
import Login from "./features/Auth/LogIn/Login";
import Profile from "./common/components/Users/Profile/Profile";
import DeleteByAdmin from "./features/Admin/DeleteByAdmin";
import Questionnaire from "./common/components/Users/formQuestionnaire/Questionnaire";
import UserStatByAdmin from "./features/Admin/UserStatByAdmin";
import axios from "axios";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus(); // Check login status on component mount
  }, []);

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

  const handleLogin = async () => {
    await checkLoginStatus(); // Update login status after login
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:6500/backend/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false); // Update state on logout
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <div id="root">
      <div className="App">
        <Router>
          <Navbar onLogout={handleLogout} />
          {isLoggedIn && <UserNavbar />} {/* Conditionally render UserNavbar */}
          <Routes>
            <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/update" element={<UpdateD />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/deleteByAdmin" element={<DeleteByAdmin />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/UserStatByAdmin" element={<UserStatByAdmin />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
