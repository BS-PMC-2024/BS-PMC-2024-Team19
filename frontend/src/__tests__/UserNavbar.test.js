import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserNavbar from "../common/components/Navbar/UserNavbar";

// Mock useNavigate and fetch
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

global.fetch = jest.fn();

describe("UserNavbar Component", () => {
  let navigateMock;

  beforeEach(() => {
    fetch.mockClear();
    navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);
  });

  test("renders Portfolio, Invest Info, and All Stocks buttons", () => {
    render(
      <MemoryRouter>
        <UserNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Invest Info")).toBeInTheDocument();
    expect(screen.getByText("All Stocks")).toBeInTheDocument();
  });

  test("navigates to /portfolio when Portfolio button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/invest-info"]}>
        <UserNavbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Portfolio"));

    expect(navigateMock).toHaveBeenCalledWith("/portfolio");
  });

  test("navigates to /PremiumPage or /NonPremiumInfo when Invest Info button is clicked", async () => {
    // Simulate a prime user
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ isPrime: true }),
    });

    render(
      <MemoryRouter initialEntries={["/portfolio"]}>
        <UserNavbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Invest Info"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:6500/backend/user/statusIsPrime",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      expect(navigateMock).toHaveBeenCalledWith("/PremiumPage");
    });

    // Simulate a non-prime user
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ isPrime: false }),
    });

    fireEvent.click(screen.getByText("Invest Info"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(navigateMock).toHaveBeenCalledWith("/NonPremiumInfo");
    });
  });

  test("navigates to /AllStocks when All Stocks button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/portfolio"]}>
        <UserNavbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("All Stocks"));

    expect(navigateMock).toHaveBeenCalledWith("/AllStocks");
  });
});