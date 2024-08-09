import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../common/components/Header/Header";
import Navbar from "../common/components/Navbar/Navbar";

// Mock the Navbar component
jest.mock("../common/components/Navbar/Navbar", () => () => (
  <div>Mock Navbar</div>
));

describe("Header Component", () => {
  test("renders the Navbar component", () => {
    render(<Header />);
    expect(screen.getByText("Mock Navbar")).toBeInTheDocument();
  });

  test("renders the header title", () => {
    render(<Header />);
    const titleElement = screen.getByText(/AI-Based Investment Management/i);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H1");
    expect(titleElement).toHaveClass("header-title");
  });

  test("renders the description text", () => {
    render(<Header />);
    const descriptionElement = screen.getByText(
      /Optimize and manage your investment portfolio with BestInvest/i
    );
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.tagName).toBe("P");
    expect(descriptionElement).toHaveClass("text-lead");
  });
});
