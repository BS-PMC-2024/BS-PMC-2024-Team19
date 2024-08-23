import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AllStocks from "../common/components/Users/Protfolio/AllStocks";

// Mocking the fetch call
global.fetch = jest.fn(() =>
  Promise.resolve({
    // INTEGRATION TEST: This mocks the global `fetch` function to simulate an API response.
    ok: true,
    json: () =>
      Promise.resolve([
        {
          id: 1,
          symbol: "AAPL",
          latest_price: 150,
          change_percent: 2.5,
          risk_label: "A",
        },
        {
          id: 2,
          symbol: "GOOGL",
          latest_price: 2800,
          change_percent: -1.3,
          risk_label: "B",
        },
      ]),
  })
);

describe("AllStocks Component", () => {
  beforeEach(() => {
    fetch.mockClear(); // Ensures that the mock fetch is cleared before each test.
  });

  it("renders without crashing", () => {
    render(<AllStocks />);
    // UNIT TEST: This test ensures the AllStocks component renders without throwing errors.
  });

  it("fetches and displays stocks", async () => {
    render(<AllStocks />);

    // Using findBy to wait for the elements to be in the document
    expect(await screen.findByText("AAPL")).toBeInTheDocument();
    expect(await screen.findByText("GOOGL")).toBeInTheDocument();
    // INTEGRATION TEST: This test checks that the component successfully fetches and displays stock data from the mocked API.
  });
});
