import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../features/Auth/LogIn/Login"; // Adjust the path as necessary

test("renders login form", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  // Check if the input fields and submit button are in the document
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  // UNIT TEST: This test ensures that the Login component correctly renders the email and password input fields.
});

test("renders submit button", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  // Check if the submit button is in the document
  expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  // UNIT TEST: This test checks that the Login component renders the submit button with the correct label.
});
