import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import NeedHelp from "../common/components/needHelp/needHelp";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

test("renders chat icon", () => {
  render(<NeedHelp />);
  const chatIcon = screen.getByText(/💬/i);
  expect(chatIcon).toBeInTheDocument();
});

test("opens and closes help request form on chat icon click", () => {
  render(<NeedHelp />);
  const chatIcon = screen.getByText(/💬/i);

  // Open the form
  fireEvent.click(chatIcon);
  expect(screen.getByText(/Need Help?/i)).toBeInTheDocument();

  // Close the form
  fireEvent.click(chatIcon);
  expect(screen.queryByText(/Need Help?/i)).not.toBeInTheDocument();
});
