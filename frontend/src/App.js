import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./features/HomePage/HomePage";
import Navbar from "./common/components/Navbar/Navbar";
import Footer from "./common/components/Footer/Footer";
import UpdateD from "./common/components/Users/UpdateD";
import SignUp from "./features/Auth/SignUp/SignUp";
import Login from "./features/Auth/LogIn/Login";
import axios from "axios";

function App() {
  useEffect(() => {
    const initializeApp = async () => {
      // Check if cookies have been cleared in this session
      const hasClearedCookies = sessionStorage.getItem("hasClearedCookies");

      if (!hasClearedCookies) {
        try {
          await axios.post(
            "http://localhost:6500/backend/auth/clear-cookies",
            {},
            { withCredentials: true }
          );
          console.log("Cookies cleared.");
          sessionStorage.setItem("hasClearedCookies", "true");
          window.location.reload(); // Reload the page to ensure cookies are cleared
        } catch (err) {
          console.error("Failed to clear cookies:", err);
        }
      }
    };

    initializeApp();
  }, []);

  return (
    <div>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/update" element={<UpdateD />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
