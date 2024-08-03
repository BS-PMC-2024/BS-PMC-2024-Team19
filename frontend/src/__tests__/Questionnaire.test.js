import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Questionnaire from "../common/components/Users/formQuestionnaire/Questionnaire";
import sections from "../constants/data";
import { MemoryRouter } from "react-router-dom";

// Mock the fetch function
global.fetch = jest.fn();

describe("Questionnaire", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders Questionnaire title", () => {
    render(
      <MemoryRouter>
        <Questionnaire />
      </MemoryRouter>
    );
    expect(screen.getByText("Questionnaire")).toBeInTheDocument();
  });

  test("renders the first question correctly", () => {
    render(
      <MemoryRouter>
        <Questionnaire />
      </MemoryRouter>
    );
    expect(
      screen.getByText(sections.questions[0].question)
    ).toBeInTheDocument();
  });

  test("can select an answer and move to the next question", async () => {
    render(
      <MemoryRouter>
        <Questionnaire />
      </MemoryRouter>
    );

    // Select the first answer for the first question
    fireEvent.click(screen.getByText(sections.questions[0].options[0]));

    // Click the Next button
    fireEvent.click(screen.getByText("Next"));

    // Check that the next question is displayed
    await waitFor(() =>
      expect(
        screen.getByText(sections.questions[1].question)
      ).toBeInTheDocument()
    );
  });

  test("can submit the questionnaire", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: "Questionnaire submitted successfully",
      }),
    });

    render(
      <MemoryRouter>
        <Questionnaire />
      </MemoryRouter>
    );

    // Select answers for all questions
    sections.questions.forEach((question, index) => {
      fireEvent.click(screen.getByText(question.options[0]));
      if (index < sections.questions.length - 1) {
        fireEvent.click(screen.getByText("Next"));
      }
    });

    // Click the Submit button
    await act(async () => {
      fireEvent.click(screen.getByText("Submit"));
    });

    // Wait for the fetch call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:6500/backend/auth/submit-questionnaire",
        expect.any(Object)
      );
    });

    // Check if the success message is logged
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});
