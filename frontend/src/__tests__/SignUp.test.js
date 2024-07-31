import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "../features/Auth/SignUp/SignUp";

test("renders Sign Up form", () => {
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  );

  // Check if the form elements are present
  expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
});

test("initial state of form fields", () => {
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  );

  // Check that fields are initially empty
  expect(screen.getByPlaceholderText(/Full Name/i).value).toBe("");
  expect(screen.getByPlaceholderText(/email/i).value).toBe("");
});

test("input change updates field values", () => {
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  );

  // Simulate user input
  fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: "john@example.com" },
  });

  // Check that input values are updated
  expect(screen.getByPlaceholderText(/Full Name/i).value).toBe("John Doe");
  expect(screen.getByPlaceholderText(/email/i).value).toBe("john@example.com");
});
