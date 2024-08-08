import React, { useEffect } from "react";
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
import PremiumPage from './features/PremiumPage/PremiumPage';
import axios from "axios";
import "./App.css"; // Ensure you import your global CSS

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
          window.location.reload();
        } catch (err) {
          console.error("Failed to clear cookies:", err);
        }
      }
    };

    initializeApp();
  }, []);

  return (
    <div id="root">
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/update" element={<UpdateD />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/DeleteByAdmin" element={<DeleteByAdmin />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/UserStatByAdmin" element={<UserStatByAdmin />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
