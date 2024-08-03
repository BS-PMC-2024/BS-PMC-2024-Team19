import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateD from "../common/components/Users/UpdateD"; // Adjust the import path if necessary
import { MemoryRouter } from "react-router-dom";

// Mock the fetch function to control its behavior
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

test("displays error messages for invalid inputs", async () => {
  render(
    <MemoryRouter>
      <UpdateD />
    </MemoryRouter>
  );

  // Find input elements
  const oldPasswordInput = screen.getByLabelText(/Old Password:/i);
  const newPasswordInput = screen.getByLabelText(/New Password:/i);
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password:/i);

  // Fill out the form with invalid data
  fireEvent.change(oldPasswordInput, { target: { value: "oldPass" } });
  fireEvent.change(newPasswordInput, { target: { value: "short" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "different" } });

  // Click the submit button
  fireEvent.click(screen.getByRole("button", { name: /Change Password/i }));

  // Wait for error messages to be updated
  await waitFor(() => {
    expect(
      screen.getByText(/Password must be at least 6 characters long/i)
    ).toBeInTheDocument();
  });
});

test("successfully updates password with valid input", async () => {
  // Mock the fetch function to simulate a successful response
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );

  render(
    <MemoryRouter>
      <UpdateD />
    </MemoryRouter>
  );

  // Find input elements
  const oldPasswordInput = screen.getByLabelText(/Old Password:/i);
  const newPasswordInput = screen.getByLabelText(/New Password:/i);
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password:/i);

  // Fill out the form with valid data
  fireEvent.change(oldPasswordInput, { target: { value: "oldPass123" } });
  fireEvent.change(newPasswordInput, { target: { value: "newPass123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "newPass123" } });

  // Click the submit button
  fireEvent.click(screen.getByRole("button", { name: /Change Password/i }));

  // Wait for success message to be updated
  await waitFor(() => {
    expect(
      screen.getByText(/Password updated successfully/i)
    ).toBeInTheDocument();
  });
});
