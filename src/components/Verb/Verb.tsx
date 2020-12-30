import React from "react";
import { all_input_categories } from "../../constants/variables";
import Button from "react-bootstrap/Button";
import "./Verb.css";
import InputBox from "../InputBox/InputBox";
import { VerbSolution, MarkedSolution } from "../../interfaces/interfaces";
import {
  getAttemptAndCorrectionElements,
  focusFirstInputField,
  focusFirstErrorInputField,
} from "../../tools";
import {
  COMPLETE_SOLUTION,
  PARTIAL_SOLUTION,
  INCORRECT_SOLUTION,
  ENTER_KEY,
  TAB_KEY,
} from "../../constants/variables";
import useMultiKeyPress from "../../tools/useMultiKeyPress";
import { theme } from "../../theme";
import styled from "styled-components";

const VerbWrapper = styled.div`
  @media ${theme.device.mobile} {
    display: flex;
    flex-direction: column;
  }
  @media ${theme.device.tablet} {
    display: flex;
    flex-direction: row;
  }
`;
interface VerbProps {
  answer: VerbSolution;
  loadNextVerb: () => void;
  eraseMarkings: () => void;
}

/** Page that displays verb exercise sheet */
export default function Verb(props: VerbProps) {
  const { answer: accepted_answer, loadNextVerb, eraseMarkings } = props;
  useMultiKeyPress(["Shift", "Enter"], clickSubmitButton);

  function clickSubmitButton(): void {
    (document.getElementById("submit_button") as HTMLElement).click();
  }

  function checkAnswers(e?: any): void {
    const invalid_keyboard_stroke =
      e && e.type === "keydown" && ![ENTER_KEY, TAB_KEY].includes(e.keyCode);

    if (invalid_keyboard_stroke) {
      return;
    }

    if (e.keyCode === TAB_KEY) {
      focusFirstInputField(e);
      return;
    }
    if (
      (all_input_categories as (keyof VerbSolution)[]).every((category) =>
        checkAnswer(category)
      )
    ) {
      prepareNextVerb(e);
    } else {
      (all_input_categories as (keyof VerbSolution)[]).forEach((category) =>
        checkAnswer(category)
      );
      focusFirstErrorInputField(e);
    }
  }

  function checkAnswer(category: keyof VerbSolution) {
    const attempt = normalizeString(
      (document.getElementById(`attempt-${category}`) as HTMLInputElement).value
    );
    const answer = accepted_answer[category as keyof VerbSolution];
    switch (checkMultiplePossibleSolutions({ attempt, answer })) {
      case COMPLETE_SOLUTION:
        return markCorrect({ accepted_answer, category });
      case PARTIAL_SOLUTION:
        return markPartiallyCorrect({ accepted_answer, category });
      default:
        return markIncorrect({ accepted_answer, category });
    }
  }

  function prepareNextVerb(e: any) {
    loadNextVerb();
    eraseMarkings();
    focusFirstInputField(e);
  }

  return (
    <VerbWrapper>
      <Infinitive text={accepted_answer.infinitive} />
      <InputBox header="Present" />
      <InputBox header="Past" />
      <InputBox header="Present Perfect" />
      <InputBox header="English" />
      <Button
        id="submit_button"
        className="submit-button"
        onClick={checkAnswers}
        onKeyDown={checkAnswers}
      >
        Submit
      </Button>
    </VerbWrapper>
  );
}

// SUB-COMPONENTS
function Infinitive({ text }: { text: string }) {
  return (
    <div style={{ margin: "5px" }}>
      <div>Infinitive</div>
      <h4>{text}</h4>
    </div>
  );
}

// HELPERS
function normalizeString(str: string): string {
  return str.toLowerCase().trim();
}

interface MarkingProps {
  category: keyof VerbSolution;
  accepted_answer: VerbSolution;
}

/** Adds an 'incorrect' class to an element */
function markIncorrect({ accepted_answer, category }: MarkingProps): boolean {
  const { attempt, correction } = getAttemptAndCorrectionElements({ category });
  attempt.className = "incorrect_attempt";
  correction.className = "incorrect_correction";
  correction.innerText = accepted_answer[category as keyof VerbSolution];
  return false;
}

/** Adds a 'correct' class to an element */
function markCorrect({ category }: MarkingProps): boolean {
  const { attempt, correction } = getAttemptAndCorrectionElements({ category });
  attempt.className = "correct_attempt";
  correction.innerText = "";
  return true;
}

/** Adds a 'partially correct' class to an element */
function markPartiallyCorrect({
  accepted_answer,
  category,
}: MarkingProps): boolean {
  const { attempt, correction } = getAttemptAndCorrectionElements({ category });
  attempt.className = "partially-correct_attempt";
  correction.className = "partially-correct_correction";
  correction.innerText = accepted_answer[category as keyof VerbSolution];
  return true;
}

interface CheckMultiplePossibleSolutionsProps {
  attempt: string;
  answer: string;
}

/** Compares an answer and an attempt. Returns false if attempt differs from answer */
export function checkMultiplePossibleSolutions(
  props: CheckMultiplePossibleSolutionsProps
): MarkedSolution {
  const { attempt, answer } = props;
  let att = attempt.split(",").map((phrase) => phrase.trim());
  let ans = answer.split(",").map((phrase) => phrase.trim());

  return att.every((v) => ans.includes(v))
    ? ans.every((v) => att.includes(v))
      ? COMPLETE_SOLUTION
      : PARTIAL_SOLUTION
    : INCORRECT_SOLUTION;
}
