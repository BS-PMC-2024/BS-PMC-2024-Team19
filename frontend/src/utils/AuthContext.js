// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6500/backend/auth/status",
        { withCredentials: true }
      );
      setUser(response.data.loggedIn ? { name: response.data.name } : null);
    } catch (err) {
      console.error("Failed to check login status:", err);
      setUser(null);
    }
  };

  const login = async () => {
    await checkLoginStatus(); // Update status after login
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:6500/backend/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null); // Clear user state on logout
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
