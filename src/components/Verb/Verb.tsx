import React from "react";
import { allCategories } from "../../constants/variables";
import Button from "react-bootstrap/Button";
import "./Verb.css";
import InputBox from "../InputBox/InputBox";

interface VerbSolution {
  infinitive: string;
  present: string;
  past: string;
  "present-perfect": string;
  english: string;
}
interface VerbProps {
  answer: VerbSolution;
  nextVerb: () => void;
  eraseForm: () => void;
}

export const COMPLETE_SOLUTION = "complete solution";
export const PARTIAL_SOLUTION = "partial solution";
export const INCORRECT_SOLUTION = "incorrect solution";

/** Page that displays verb exercise sheet */
export default function Verb(props: VerbProps) {
  const { answer: accepted_answer, nextVerb, eraseForm } = props;

  function checkAnswers(): void {
    if (
      (allCategories as (keyof VerbSolution)[]).every(category =>
        checkAnswer(category)
      )
    ) {
      loadNextVerbAndEraseForm();
    } else {
      (allCategories as (keyof VerbSolution)[]).forEach(category =>
        checkAnswer(category)
      );
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

  function loadNextVerbAndEraseForm() {
    nextVerb();
    eraseForm();
  }

  return (
    <div className="verb">
      <Infinitive text={accepted_answer.infinitive} />
      <InputBox header="Present" />
      <InputBox header="Past" />
      <InputBox header="Present Perfect" />
      <InputBox header="English" />
      <Button className="submit-button" onClick={checkAnswers}>
        Submit
      </Button>
    </div>
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
function getAttemptAndCorrectionElements({
  category
}: {
  category: keyof VerbSolution;
}) {
  const attempt = document.getElementById(
    `attempt-${category}`
  ) as HTMLInputElement;
  const correction = document.getElementById(
    `answer-${category}`
  ) as HTMLInputElement;

  return [attempt, correction];
}

function normalizeString(str: string): string {
  return str.toLowerCase().trim();
}

interface MarkingProps {
  category: keyof VerbSolution;
  accepted_answer: VerbSolution;
}

/** Adds an 'incorrect' class to an element */
function markIncorrect({ accepted_answer, category }: MarkingProps): boolean {
  const [attempt, correction] = getAttemptAndCorrectionElements({ category });
  attempt.className = "incorrect_attempt";
  correction.className = "incorrect_correction";
  correction.innerText = accepted_answer[category as keyof VerbSolution];
  return false;
}

/** Adds a 'correct' class to an element */
function markCorrect({ category }: MarkingProps): boolean {
  const [attempt, correction] = getAttemptAndCorrectionElements({ category });
  attempt.className = "correct_attempt";
  correction.innerText = "";
  return true;
}

/** Adds a 'partially correct' class to an element */
function markPartiallyCorrect({
  accepted_answer,
  category
}: MarkingProps): boolean {
  const [attempt, correction] = getAttemptAndCorrectionElements({ category });
  attempt.className = "partially-correct_attempt";
  correction.className = "partially-correct_correction";
  correction.innerText = accepted_answer[category as keyof VerbSolution];
  return true;
}

interface CheckMultiplePossibleSolutionsProps {
  attempt: string;
  answer: string;
}

type MarkedSolution =
  | typeof COMPLETE_SOLUTION
  | typeof PARTIAL_SOLUTION
  | typeof INCORRECT_SOLUTION;

/** Compares an answer and an attempt. Returns false if attempt differs from answer */
export function checkMultiplePossibleSolutions(
  props: CheckMultiplePossibleSolutionsProps
): MarkedSolution {
  const { attempt, answer } = props;
  let att = attempt.split(",").map(phrase => phrase.trim());
  let ans = answer.split(",").map(phrase => phrase.trim());

  const partialSolution = (att: string[], ans: string[]): boolean => {
    return att.every(v => ans.includes(v));
  };

  const completeSolution = (att: string[], ans: string[]): boolean => {
    return partialSolution(att, ans) && att.length === ans.length;
  };

  if (completeSolution(att, ans)) {
    return COMPLETE_SOLUTION;
  } else if (partialSolution(att, ans)) {
    return PARTIAL_SOLUTION;
  }
  return INCORRECT_SOLUTION;
}
