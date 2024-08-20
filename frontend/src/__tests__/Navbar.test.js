import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../common/components/Navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

jest.mock("../utils/AuthContext", () => ({
  useAuth: () => ({
    user: { isAdmin: false },
    logout: jest.fn(),
  }),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

describe("Navbar Component", () => {
  test('navigates to login page on "Log In" click', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    fireEvent.click(screen.getByText(/Log In/i)); //INTEGRATION TESTS

    // Confirm the navigation by checking the URL
    expect(window.location.pathname).toBe("/login");
  });

  test('navigates to signup page on "Sign Up" click', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    fireEvent.click(screen.getByText(/Sign Up/i));

    expect(window.location.pathname).toBe("/signup"); //INTEGRATION TESTS
  });
});
