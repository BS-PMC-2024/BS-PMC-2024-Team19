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
  });
});
