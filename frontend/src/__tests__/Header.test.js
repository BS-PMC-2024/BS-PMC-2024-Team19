import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for the 'toBeInTheDocument' matcher
import Header from "../common/components/Header/Header";
test("renders Header component with title and description", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  // Add your assertions here
  const headerElement = screen.getByRole("banner"); // Assuming Header uses a <header> element
  expect(headerElement).toBeInTheDocument();
});
