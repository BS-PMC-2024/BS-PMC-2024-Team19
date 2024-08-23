import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserStatByAdmin from "../features/Admin/UserStatByAdmin";

// Mock the fetch function
global.fetch = jest.fn();

describe("UserStatByAdmin", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders loading state initially", () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ users: [] }),
    });

    render(<UserStatByAdmin />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    // UNIT TEST: Verifies that the component shows a loading message while fetching data.
  });

  test("renders user table correctly", async () => {
    const users = [
      { fullName: "John Doe", email: "john@example.com", isPrime: true },
      { fullName: "Jane Doe", email: "jane@example.com", isPrime: false },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ users }),
    });

    render(<UserStatByAdmin />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });
    // INTEGRATION TEST: Ensures that the user table is rendered with the correct data after fetching.
  });

  test("handles user removal correctly", async () => {
    const users = [
      { fullName: "John Doe", email: "john@example.com", isPrime: true },
    ];

    // Add implementation details for user removal handling
    // Example code might include simulating a button click to remove a user and then asserting the updated state.

    // For now, the test needs to be completed
    // TODO: Implement the user removal test logic.
  });

  test("handles status change correctly", async () => {
    const users = [
      { fullName: "John Doe", email: "john@example.com", isPrime: true },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ users }),
    });

    render(<UserStatByAdmin />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "User status updated successfully" }),
    });

    fireEvent.change(screen.getByDisplayValue("Prime"), {
      target: { value: "Not Prime" },
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue("Not Prime")).toBeInTheDocument();
    });
    // INTEGRATION TEST: Verifies that changing the user status from "Prime" to "Not Prime" updates the UI correctly.
  });

  test("displays error message on fetch failure", async () => {
    fetch.mockRejectedValueOnce(new Error("Network response was not ok"));

    render(<UserStatByAdmin />);

    await waitFor(() => {
      expect(
        screen.getByText("Error: Network response was not ok")
      ).toBeInTheDocument();
    });
    // INTEGRATION TEST: Ensures that an error message is displayed when the fetch operation fails.
  });
});
