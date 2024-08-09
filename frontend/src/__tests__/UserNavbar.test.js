import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import UserNavbar from "../common/components/Navbar/UserNavbar";

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("UserNavbar Component", () => {
  test("renders Portfolio and Invest Info buttons", () => {
    render(
      <MemoryRouter>
        <UserNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Invest Info")).toBeInTheDocument();
  });

  test("navigates to /portfolio when Portfolio button is clicked", () => {
    const navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);

    render(
      <MemoryRouter initialEntries={["/invest-info"]}>
        <UserNavbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Portfolio"));
    expect(navigateMock).toHaveBeenCalledWith("/questionnaire");
  });

  test("navigates to /invest-info when Invest Info button is clicked", () => {
    const navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);

    render(
      <MemoryRouter initialEntries={["/portfolio"]}>
        <UserNavbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Invest Info"));
    expect(navigateMock).toHaveBeenCalledWith("/invest-info");
  });
});
