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
import NeedHelp from "./common/components/needHelp/needHelp";
import PopularStockReport from "./common/components/Users/PopularStockReport/PopularStockReport";
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

      if (response.data.loggedIn) {
        const userInfo = {
          name: response.data.name,
          isAdmin: response.data.isAdmin,
          isPrime: response.data.isPrime,
        };
        setUser(userInfo);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to check login status:", err);
      setUser(null);
    }
  }, [setUser]);

  const handleLogin = async () => {
    await checkLoginStatus();
  };

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <>
      <Navbar onLogout={logout} />
      {/* Show PopularStockReport between Navbar and UserNavbar */}
      <div className="main-content">
        {user && !isHomePage && !user.isAdmin && <PopularStockReport />}
        {user && !isHomePage && !user.isAdmin && <UserNavbar />}
      </div>
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
      {user && !isHomePage && !user.isAdmin && <NeedHelp />}

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
