import React, { useState } from "react";
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

function Verb(props: VerbProps) {
  // state
  const [present, setPresent] = useState(false);
  const [past, setPast] = useState(false);
  const [present_perfect, setPresentPerfect] = useState(false);
  const [english, setEnglish] = useState(false);

  // props destructuring
  const { answer: accepted_answer, nextVerb, eraseForm } = props;

  function neutralizeString(str: string): string {
    return str.toLowerCase().trim();
  }

  function checkMultiplePossibleSolutions(
    attempt: string,
    answer: string
  ): string | false {
    let att = attempt.split(",").map(phrase => phrase.trim());
    let ans = answer.split(",").map(phrase => phrase.trim());

    const partialSolution = (att: string[], ans: string[]): boolean => {
      return att.every(v => ans.includes(v));
    };

    const completeSolution = (att: string[], ans: string[]): boolean => {
      return partialSolution(att, ans) && att.length === ans.length;
    };

    if (completeSolution(att, ans)) {
      return "complete solution";
    } else if (partialSolution(att, ans)) {
      return "partial solution";
    }
    return false;
  }

  function checkAnswers(): void {
    if (
      (allCategories as (keyof VerbSolution)[]).every(category =>
        checkAnswer(category)
      )
    ) {
      loadNextVerb();
    } else {
      (allCategories as (keyof VerbSolution)[]).forEach(category =>
        checkAnswer(category)
      );
    }
  }

  function checkAnswer(category: keyof VerbSolution) {
    const attempt = neutralizeString(
      (document.getElementById(`attempt-${category}`) as HTMLInputElement).value
    );
    const answer = accepted_answer[category as keyof VerbSolution];
    switch (checkMultiplePossibleSolutions(attempt, answer)) {
      case "complete solution":
        return markCorrect(category);
      case "partial solution":
        return markPartiallyCorrect(category);
      default:
        return markIncorrect(category);
    }
  }

  function updateState({
    category,
    state
  }: {
    category: keyof VerbSolution;
    state: boolean;
  }) {
    switch (category) {
      case "present":
        return setPresent(state);
      case "past":
        return setPast(state);
      case "present-perfect":
        return setPresentPerfect(state);
      case "english":
        return setEnglish(state);
    }
  }

  function markIncorrect(category: keyof VerbSolution): boolean {
    const attempt = document.getElementById(
      `attempt-${category}`
    ) as HTMLInputElement;
    const correction = document.getElementById(
      `answer-${category}`
    ) as HTMLInputElement;
    correction.style.color = "darkRed";
    correction.innerText = accepted_answer[category as keyof VerbSolution];
    attempt.style.border = "medium solid red";
    updateState({ category, state: false });
    return false;
  }

  function markCorrect(category: keyof VerbSolution): boolean {
    const attempt = document.getElementById(
      `attempt-${category}`
    ) as HTMLInputElement;
    const correction = document.getElementById(
      `answer-${category}`
    ) as HTMLInputElement;
    correction.innerText = "";
    attempt.style.border = "medium solid green";
    updateState({ category, state: true });
    return true;
  }

  function markPartiallyCorrect(category: keyof VerbSolution): boolean {
    const attempt = document.getElementById(
      `attempt-${category}`
    ) as HTMLInputElement;
    const correction = document.getElementById(
      `answer-${category}`
    ) as HTMLInputElement;
    correction.style.color = "green";
    correction.innerText = accepted_answer[category as keyof VerbSolution];
    attempt.style.border = "medium dotted green";
    updateState({ category, state: true });
    return true;
  }

  function loadNextVerb() {
    nextVerb();
    eraseForm();
  }

  const Infinitive = () => {
    return (
      <div style={{ margin: "5px" }}>
        <div>Infinitive</div>
        <h4>{accepted_answer.infinitive}</h4>
      </div>
    );
  };

  return (
    <div className="verb">
      <Infinitive />
      <InputBox header="Present" />
      <InputBox header="Past" />
      <InputBox header="Present Perfect" />
      <InputBox header="English" />
      <Button style={{ margin: "5px", width: "80px" }} onClick={checkAnswers}>
        Submit
      </Button>
    </div>
  );
}

export default Verb;
