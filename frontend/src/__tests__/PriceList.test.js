import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PriceList from "../common/components/Users/Props/PriceList";

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
    // UNIT TEST: This test verifies that clicking the "Cancel" button triggers the `onClose` function.
  });
});
