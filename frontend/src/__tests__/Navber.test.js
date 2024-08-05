import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Navbar from "../common/components/Navbar/Navbar"; // Adjust the path if necessary
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");
jest.mock("../utils/clearCookies", () => jest.fn());

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Navbar Component", () => {
  test("renders Navbar and checks login buttons when logged out", async () => {
    axios.get.mockResolvedValueOnce({ data: { loggedIn: false } });

    renderWithRouter(<Navbar />);

    await waitFor(() => {
      expect(screen.getByText(/BestInvest/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  test("navigates to login on login button click", async () => {
    axios.get.mockResolvedValueOnce({ data: { loggedIn: false } });

    renderWithRouter(<Navbar />);

    const loginButton = screen.getByText(/Log In/i);
    fireEvent.click(loginButton);
    expect(window.location.pathname).toBe("/login");
  });

  test("navigates to signup on signup button click", async () => {
    axios.get.mockResolvedValueOnce({ data: { loggedIn: false } });

    renderWithRouter(<Navbar />);

    const signUpButton = screen.getByText(/Sign Up/i);
    fireEvent.click(signUpButton);
    expect(window.location.pathname).toBe("/signup");
  });
});
