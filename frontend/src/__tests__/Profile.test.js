import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Profile from "../common/components/Users/Profile/Profile"; // Adjust the path if necessary
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

test("renders Profile component", async () => {
  axios.get.mockResolvedValueOnce({
    // AXIOS INTEGRATION TEST: This mocks the Axios GET request and simulates the API response.
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
    // UNIT TEST: This checks if the "User Profile" text is rendered, verifying that the component loads successfully.
  });
});

test("fetches and displays user status on mount", async () => {
  axios.get.mockResolvedValueOnce({
    // AXIOS INTEGRATION TEST: This simulates fetching user data, focusing on the user's status (Prime or not).
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
    // INTEGRATION TEST: This checks if the "Premium User" status is correctly displayed after the data is fetched and rendered.
  });
});
