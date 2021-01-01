import React, { useEffect, useReducer, useState } from "react";
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
import {
  Category,
  IInfinitive,
  ReducerAction,
  ReducerState,
  Validity,
} from "../pages/Verbs/VerbsTypingPage/VerbsTypingPage";
import { IVerb } from "../../constants/data";

/**
 * Interfaces
 */
interface VerbProps {
  state: ReducerState;
  dispatch: React.Dispatch<ReducerAction>;
  verb: IVerb;
  infinitive: IInfinitive;
  all_infinitives: IInfinitive[];
  setInfinitive: React.Dispatch<React.SetStateAction<IInfinitive>>;
}

interface ICheckAnswer {
  input: string;
  answer: string;
  category: Category;
}

/**
 * Styled components
 */
const VerbWrapper = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  background-color: white;
  padding: 16px;
  border-radius: 18px;
  ${theme.shadow.topLeft};
  @media ${theme.device.mobile} {
    flex-direction: column;
    max-width: 50%;
    > button {
      margin: 16px 8px 0px 8px;
    }
    /* min-width: 250px; */
  }
  @media ${theme.device.tablet} {
    flex-direction: row;
    margin-top: 100px;
    max-width: 80%;
    > button {
      margin: 0px 0px 0px 16px;
    }
  }
`;

const InfinitiveWrapper = styled.div`
  @media ${theme.device.mobile} {
    margin-bottom: 8px;
  }
  @media ${theme.device.tablet} {
    margin: 8px 24px 8px 8px;
  }
`;

const InputsWrapper = styled.div`
  display: flex;
  @media ${theme.device.mobile} {
    flex-wrap: wrap;
  }
  @media ${theme.device.desktop} {
    flex-wrap: nowrap;
  }
`;

const InfinitiveTitle = styled.div`
  font-weight: 400;
`;

const Infinitive = styled.h4`
  font-weight: 800;
`;

/** Page that displays verb exercise sheet */
export default function Verb(props: VerbProps) {
  const {
    verb,
    infinitive,
    all_infinitives,
    setInfinitive,
    state,
    dispatch,
  } = props;
  useMultiKeyPress(["Shift", "Enter"], clickSubmitButton);

  function clickSubmitButton(): void {
    (document.getElementById("submit_button") as HTMLElement).click();
  }

  const { present, past, present_perfect, english } = state;

  function loadNextVerb(): void {
    const current_index = all_infinitives.indexOf(infinitive);
    const next_index = current_index + 1;
    if (all_infinitives[next_index]) {
      setInfinitive(all_infinitives[next_index]);
    } else {
      setInfinitive(all_infinitives[0]);
    }
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

    // Check each answer
    (Object.keys(Category) as (keyof typeof Category)[]).forEach((c) =>
      checkAnswer({
        input: state[c].value,
        answer: verb[c],
        category: Category[c],
      })
    );

    // Load next verb if all answers are valid
    if (
      [
        present.validity,
        past.validity,
        present_perfect.validity,
        english.validity,
      ].every((val) =>
        [Validity.correct, Validity.partially_correct].includes(val)
      )
    ) {
      loadNextVerb();
    }
  }

  function checkAnswer({ input, answer, category }: ICheckAnswer) {
    let att = input.split(",").map((phrase) => phrase.trim());
    let ans = answer.split(",").map((phrase) => phrase.trim());

    const validity = att.every((v) => ans.includes(v))
      ? ans.every((v) => att.includes(v))
        ? Validity.correct
        : Validity.partially_correct
      : Validity.incorrect;

    dispatch({
      type: "set_validity",
      payload: { category, validity },
    });
  }

  return (
    <VerbWrapper>
      <InfinitiveWrapper>
        <InfinitiveTitle>Infinitive</InfinitiveTitle>
        <Infinitive>{infinitive}</Infinitive>
      </InfinitiveWrapper>
      <InputsWrapper>
        <InputBox
          header="Present"
          category={Category.present}
          value={present.value}
          answer={verb.present}
          validity={present.validity}
          dispatch={dispatch}
        />
        <InputBox
          header="Past"
          category={Category.past}
          value={past.value}
          answer={verb.past}
          validity={past.validity}
          dispatch={dispatch}
        />
        <InputBox
          header="Present Perfect"
          category={Category.present_perfect}
          value={present_perfect.value}
          answer={verb.present_perfect}
          validity={present_perfect.validity}
          dispatch={dispatch}
        />
        <InputBox
          header="English"
          category={Category.english}
          value={english.value}
          answer={verb.english}
          validity={english.validity}
          dispatch={dispatch}
        />
      </InputsWrapper>
      <Button
        id="submit_button"
        onClick={checkAnswers}
        onKeyDown={checkAnswers}
      >
        Submit
      </Button>
    </VerbWrapper>
  );
}
