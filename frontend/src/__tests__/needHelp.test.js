import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import NeedHelp from "../common/components/needHelp/needHelp";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

test("renders chat icon", () => {
  render(<NeedHelp />);
  const chatIcon = screen.getByText(/💬/i);
  expect(chatIcon).toBeInTheDocument();
  // UNIT TEST: This test checks if the chat icon is rendered correctly in the `NeedHelp` component.
});

test("opens and closes help request form on chat icon click", () => {
  render(<NeedHelp />);
  const chatIcon = screen.getByText(/💬/i);

  // Open the form
  fireEvent.click(chatIcon);
  expect(screen.getByText(/Need Help?/i)).toBeInTheDocument();
  // UNIT TEST: This part of the test ensures that clicking the chat icon opens the help request form.

  // Close the form
  fireEvent.click(chatIcon);
  expect(screen.queryByText(/Need Help?/i)).not.toBeInTheDocument();
  // UNIT TEST: This part of the test ensures that clicking the chat icon again closes the help request form.
});
