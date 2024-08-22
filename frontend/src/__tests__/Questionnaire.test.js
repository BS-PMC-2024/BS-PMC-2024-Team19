import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Questionnaire from "../common/components/Users/formQuestionnaire/Questionnaire";
import { MemoryRouter } from "react-router-dom";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        questions: [
          {
            questionText: "What is your investment goal?",
            options: ["Growth", "Income", "Preservation"],
          },
          {
            questionText: "How long is your investment horizon?",
            options: ["Short term", "Medium term", "Long term"],
          },
        ],
      }),
  })
);

describe("Questionnaire", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders Questionnaire title", async () => {
    render(
      <MemoryRouter>
        <Questionnaire />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Questionnaire")).toBeInTheDocument()
    );
  });

  test("renders the first question correctly", async () => {
    render(
      <MemoryRouter>
        <Questionnaire />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText("What is your investment goal?")
      ).toBeInTheDocument()
    );
  });

  test("can select an answer and move to the next question", async () => {
    render(
      <MemoryRouter>
        <Questionnaire />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText("What is your investment goal?")
      ).toBeInTheDocument()
    );

    // Select the first answer for the first question
    fireEvent.click(screen.getByText("Growth"));

    // Click the Next button
    fireEvent.click(screen.getByText("Next"));

    // Check if the second question is displayed
    await waitFor(() =>
      expect(
        screen.getByText("How long is your investment horizon?")
      ).toBeInTheDocument()
    );
  });

  test("displays the 'No questions available' message if questions array is empty", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ questions: [] }),
      })
    );

    render(
      <MemoryRouter>
        <Questionnaire />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("No questions available.")).toBeInTheDocument()
    );
  });
});