import React, { useReducer, useState } from "react";
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
import { IInfinitive } from "../pages/Verbs/VerbsTypingPage/VerbsTypingPage";
import { IVerb } from "../../constants/data";

/**
 * Styled components
 */
const VerbWrapper = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 18px;
  ${theme.shadow.topLeft};
  @media ${theme.device.mobile} {
    display: flex;
    flex-direction: column;
    /* min-width: 250px; */
  }
  @media ${theme.device.tablet} {
    display: flex;
    flex-direction: row;
  }
`;

/**
 * Interfaces
 */
interface VerbProps {
  verb: IVerb;
  infinitive: IInfinitive;
  setInfinitive: React.Dispatch<React.SetStateAction<IInfinitive>>;
}

interface ICheckAnswer {
  input: string;
  answer: string;
  category: Category;
}

export enum Validity {
  incomplete = "incomplete",
  partially_correct = "partially_correct",
  correct = "correct",
  incorrect = "incorrect",
}

interface ValidityReducerState {
  present: Validity;
  past: Validity;
  present_perfect: Validity;
  english: Validity;
}

type ValidityReducerAction =
  | {
      type: "set_validity";
      payload: {
        category: Category;
        validity: Validity;
      };
    }
  | { type: "reset" };

const initial_validity_state: ValidityReducerState = {
  present: Validity.incomplete,
  past: Validity.incomplete,
  present_perfect: Validity.incomplete,
  english: Validity.incomplete,
};

interface InputsReducerState {
  present: string;
  past: string;
  present_perfect: string;
  english: string;
}

export enum Category {
  present = "present",
  past = "past",
  present_perfect = "present_perfect",
  english = "english",
}

export type InputsReducerAction =
  | {
      type: "set_value";
      payload: {
        category: keyof InputsReducerState;
        value: string;
      };
    }
  | { type: "reset_values" };

const initial_inputs_state: InputsReducerState = {
  present: "",
  past: "",
  present_perfect: "",
  english: "",
};

/** Page that displays verb exercise sheet */
export default function Verb(props: VerbProps) {
  const { verb, infinitive, setInfinitive } = props;

  /**
   * Validity Reducer
   */
  function validityReducer(
    state: ValidityReducerState,
    action: ValidityReducerAction
  ): ValidityReducerState {
    switch (action.type) {
      case "set_validity":
        return {
          ...state,
          [action.payload.category]: action.payload.validity,
        };
      case "reset":
        return initial_validity_state;
    }
  }

  const [validity_state, dispatchValidity] = useReducer(
    validityReducer,
    initial_validity_state
  );

  const {
    present: present_validity,
    past: past_validity,
    present_perfect: present_perfect_validity,
    english: english_validity,
  } = validity_state;

  /**
   * Input Value Reducer
   */
  function inputsReducer(
    state: InputsReducerState,
    action: InputsReducerAction
  ): InputsReducerState {
    switch (action.type) {
      case "set_value":
        return {
          ...state,
          [action.payload.category]: action.payload.value,
        };
      case "reset_values":
        return initial_inputs_state;
    }
  }

  const [inputs_state, dispatchInputs] = useReducer(
    inputsReducer,
    initial_inputs_state
  );

  const {
    present: present_value,
    past: past_value,
    present_perfect: present_perfect_value,
    english: english_value,
  } = inputs_state;

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

    // Check each answer
    checkAnswer({
      input: present_value,
      answer: verb.present,
      category: Category.present,
    });
    checkAnswer({
      input: past_value,
      answer: verb.past,
      category: Category.past,
    });
    checkAnswer({
      input: present_perfect_value,
      answer: verb.present_perfect,
      category: Category.present_perfect,
    });
    checkAnswer({
      input: english_value,
      answer: verb.english,
      category: Category.english,
    });
    // Focus first errored input, or set new infinitive
    // TODO --> finish this commented block
    // if (
    //   [
    //     present_validity,
    //     past_validity,
    //     present_perfect_validity,
    //     english_validity,
    //   ].every((val) => val === Validity.correct)
    // ) {
    //   console.log("all correct!");
    // }
  }

  function checkAnswer({ input, answer, category }: ICheckAnswer) {
    let att = input.split(",").map((phrase) => phrase.trim());
    let ans = answer.split(",").map((phrase) => phrase.trim());

    const validity = att.every((v) => ans.includes(v))
      ? ans.every((v) => att.includes(v))
        ? Validity.correct
        : Validity.partially_correct
      : Validity.incorrect;

    dispatchValidity({
      type: "set_validity",
      payload: { category, validity },
    });
  }

  return (
    <VerbWrapper>
      <Infinitive text={infinitive} />
      <InputBox
        header="Present"
        category={Category.present}
        value={present_value}
        dispatchInputs={dispatchInputs}
        validity={present_validity}
      />
      <InputBox
        header="Past"
        category={Category.past}
        value={past_value}
        dispatchInputs={dispatchInputs}
        validity={past_validity}
      />
      <InputBox
        header="Present Perfect"
        category={Category.present_perfect}
        value={present_perfect_value}
        dispatchInputs={dispatchInputs}
        validity={present_perfect_validity}
      />
      <InputBox
        header="English"
        category={Category.english}
        value={english_value}
        dispatchInputs={dispatchInputs}
        validity={english_validity}
      />
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
