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
  category: ValidityCategory;
}

export enum Validity {
  incomplete = "incomplete",
  partially_correct = "partially_correct",
  correct = "correct",
  incorrect = "incorrect",
}

interface ValidityReducerState {
  present_validity: Validity;
  past_validity: Validity;
  present_perfect_validity: Validity;
  english_validity: Validity;
}

enum ValidityCategory {
  present_validity = "present_validity",
  past_validity = "past_validity",
  present_perfect_validity = "present_perfect_validity",
  english_validity = "english_validity",
}

export type Category = keyof Omit<VerbSolution, "infinitive">;

type ValidityReducerAction =
  | {
      type: "set_validity";
      payload: {
        category: ValidityCategory;
        validity: Validity;
      };
    }
  | { type: "reset" };

const initial_validity_state: ValidityReducerState = {
  present_validity: Validity.incomplete,
  past_validity: Validity.incomplete,
  present_perfect_validity: Validity.incomplete,
  english_validity: Validity.incomplete,
};

interface InputsReducerState {
  present_value: string;
  past_value: string;
  present_perfect_value: string;
  english_value: string;
}

export enum InputCategory {
  present_value = "present_value",
  past_value = "past_value",
  present_perfect_value = "present_perfect_value",
  english_value = "english_value",
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
  present_value: "",
  past_value: "",
  present_perfect_value: "",
  english_value: "",
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
    present_validity,
    past_validity,
    present_perfect_validity,
    english_validity,
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
    present_value,
    past_value,
    present_perfect_value,
    english_value,
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
      category: ValidityCategory.present_validity,
    });
    checkAnswer({
      input: past_value,
      answer: verb.past,
      category: ValidityCategory.past_validity,
    });
    checkAnswer({
      input: present_perfect_value,
      answer: verb.present_perfect,
      category: ValidityCategory.present_perfect_validity,
    });
    checkAnswer({
      input: english_value,
      answer: verb.english,
      category: ValidityCategory.english_validity,
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
        category={InputCategory.present_value}
        value={present_value}
        dispatchInputs={dispatchInputs}
        validity={present_validity}
      />
      <InputBox
        header="Past"
        category={InputCategory.past_value}
        value={past_value}
        dispatchInputs={dispatchInputs}
        validity={past_validity}
      />
      <InputBox
        header="Present Perfect"
        category={InputCategory.present_perfect_value}
        value={present_perfect_value}
        dispatchInputs={dispatchInputs}
        validity={present_perfect_validity}
      />
      <InputBox
        header="English"
        category={InputCategory.english_value}
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
