import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DeleteByAdmin from "../features/Admin/DeleteByAdmin";

test("handles input change", () => {
  render(
    <MemoryRouter>
      <DeleteByAdmin />
    </MemoryRouter>
  );

  const emailInput = screen.getByPlaceholderText(/email/i);
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });

  expect(emailInput.value).toBe("test@example.com");
});
test("renders and clicks the delete button", () => {
  render(
    <MemoryRouter>
      <DeleteByAdmin />
    </MemoryRouter>
  );

  // Check if the delete button is rendered
  const deleteButton = screen.getByRole("button", { name: /delete/i });
  expect(deleteButton).toBeInTheDocument();

  // Simulate a click event on the delete button
  fireEvent.click(deleteButton);

  // You can add further assertions here if necessary, e.g., checking if certain functions were called
});
