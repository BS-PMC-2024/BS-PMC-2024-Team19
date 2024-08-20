import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Profile from "../common/components/Users/Profile/Profile"; // Adjust the path if necessary
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

test("renders Profile component", async () => {
  axios.get.mockResolvedValueOnce({
    //AXIOS INTEGRATION TEST.
    data: {
      user: {
        fullName: "Test User",
        email: "testuser@example.com",
        isPrime: true,
      },
    },
  });

  render(
    <Router>
      <Profile />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText(/User Profile/i)).toBeInTheDocument();
  });
});

test("fetches and displays user status on mount", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      user: {
        fullName: "Test User",
        email: "testuser@example.com",
        isPrime: true,
      },
    },
  });

  render(
    <Router>
      <Profile />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText(/Premium User/i)).toBeInTheDocument();
  });
});
