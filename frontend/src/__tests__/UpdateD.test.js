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
    // UNIT TEST: This test ensures that the mocked Navbar component is rendered within the UpdateD component.
  });

  test("renders form inputs and labels", () => {
    render(<UpdateD />);
    expect(screen.getByLabelText(/Old Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    // UNIT TEST: This test verifies that the UpdateD component renders the form inputs and labels as expected.
  });
});
