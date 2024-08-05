import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PriceList from "../common/components/Users/Props/PriceList"; // Adjust the path if necessary

describe("PriceList Component", () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  const renderComponent = () => {
    return render(
      <PriceList open={true} onClose={onClose} onConfirm={onConfirm} />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("calls onClose when Cancel button is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText(/Cancel/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});