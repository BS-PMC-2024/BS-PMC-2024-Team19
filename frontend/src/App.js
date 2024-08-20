import React, { useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import UserNavbar from "./common/components/Navbar/UserNavbar";
import PremiumPage from "./features/PremiumPage/PremiumPage";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import Portfolio from "./common/components/Users/Protfolio/Portfolio";
import NonPremiumInfo from "./common/components/Users/NonPremiumInfo";
import axios from "axios";
import "./App.css";
import UpdateQ from "./features/Admin/UpdateQ ";

function AppContent() {
  const { user, setUser, logout } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const checkLoginStatus = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:6500/backend/auth/status",
        { withCredentials: true }
      );

      // Log the full response to see what data we're getting
      console.log("Login status response:", response.data);

      if (response.data.loggedIn) {
        // Set the user state with the retrieved data and log it
        const userInfo = {
          name: response.data.name,
          isAdmin: response.data.isAdmin,
          isPrime: response.data.isPrime,
        };
        console.log("Setting user info:", userInfo);
        setUser(userInfo);
      } else {
        console.log("User not logged in, setting user to null");
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to check login status:", err);
      setUser(null);
    }
  }, [setUser]);

  const handleLogin = async () => {
    await checkLoginStatus(); // Ensure status is updated after login
  };

  useEffect(() => {
    checkLoginStatus(); // Check login status on component mount
  }, [checkLoginStatus]);

  return (
    <>
      <Navbar onLogout={logout} />
      {/* Show UserNavbar only if the user is logged in, not on the home page, and is not an admin */}
      {user && !isHomePage && !user.isAdmin && <UserNavbar />}
      <Routes>
        <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/update" element={<UpdateD />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/deleteByAdmin" element={<DeleteByAdmin />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/userStatByAdmin" element={<UserStatByAdmin />} />
        <Route path="/PremiumPage" element={<PremiumPage />} />
        <Route path="/NonPremiumInfo" element={<NonPremiumInfo />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/UpdateQ" element={<UpdateQ />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div id="root">
      <div className="App">
        <Router>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;
