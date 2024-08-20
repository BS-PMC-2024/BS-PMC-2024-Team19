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
    });
  });

  test("handles user removal correctly", async () => {
    const users = [
      { fullName: "John Doe", email: "john@example.com", isPrime: true },
    ];
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
      target: { value: "Not Prime" }, //INTEFRATION TEST ' CHECK IF AFTER THE USER CHANGE FROM PRIME TO NOT PRIME THE STATUS CHANGE IN THE WEB
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue("Not Prime")).toBeInTheDocument();
    });
  });

  test("displays error message on fetch failure", async () => {
    fetch.mockRejectedValueOnce(new Error("Network response was not ok"));

    render(<UserStatByAdmin />);

    await waitFor(() => {
      expect(
        screen.getByText("Error: Network response was not ok") //INTEGRATION TEST CHECK IF SOMTHING WRONG WO GO TO ERROR APGE.
      ).toBeInTheDocument();
    });
  });
});
