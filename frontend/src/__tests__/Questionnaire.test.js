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
    // UNIT TEST: This test verifies that the Questionnaire component correctly renders the title "Questionnaire."
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
    // UNIT TEST: This test checks that the first question is rendered correctly from the fetched data.
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
    // UNIT TEST: This test ensures that the user can select an answer and navigate to the next question, verifying state changes in the component.
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
    // UNIT TEST: This test verifies that the component handles an empty questions array by displaying an appropriate message.
  });
});
