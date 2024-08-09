import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UpdateD from "../common/components/Users/UpdateD";

// Mock the Navbar component
jest.mock("../common/components/Navbar/Navbar", () => () => (
  <div>Mock Navbar</div>
));

describe("UpdateD Component", () => {
  test("renders the Navbar component", () => {
    render(<UpdateD />);
    expect(screen.getByText("Mock Navbar")).toBeInTheDocument();
  });

  test("renders form inputs and labels", () => {
    render(<UpdateD />);
    expect(screen.getByLabelText(/Old Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
  });
});
