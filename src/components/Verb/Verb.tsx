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
import { IInfinitive } from "../pages/Verbs/VerbsTypingPage/VerbsTypingPage";
import { IVerb } from "../../constants/data";

/**
 * Interfaces
 */
interface VerbProps {
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

export enum Validity {
  incomplete = "incomplete",
  partially_correct = "partially_correct",
  correct = "correct",
  incorrect = "incorrect",
}

export enum Category {
  present = "present",
  past = "past",
  present_perfect = "present_perfect",
  english = "english",
}

// New addition

export type ReducerAction =
  | {
      type: "set_value";
      payload: {
        category: Category;
        value: string;
      };
    }
  | {
      type: "set_validity";
      payload: {
        category: Category;
        validity: Validity;
      };
    }
  | {
      type: "reset";
    };
interface FieldState {
  value: string;
  validity: Validity;
}
interface ReducerState {
  present: FieldState;
  past: FieldState;
  present_perfect: FieldState;
  english: FieldState;
}

const initial_state: ReducerState = {
  present: {
    value: "",
    validity: Validity.incomplete,
  },
  past: {
    value: "",
    validity: Validity.incomplete,
  },
  present_perfect: {
    value: "",
    validity: Validity.incomplete,
  },
  english: {
    value: "",
    validity: Validity.incomplete,
  },
};

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

const InfinitiveWrapper = styled.div`
  margin: "5px";
`;

/** Page that displays verb exercise sheet */
export default function Verb(props: VerbProps) {
  const { verb, infinitive, all_infinitives, setInfinitive } = props;
  useMultiKeyPress(["Shift", "Enter"], clickSubmitButton);

  function clickSubmitButton(): void {
    (document.getElementById("submit_button") as HTMLElement).click();
  }

  /**
   * Reducer
   */
  function reducer(state: ReducerState, action: ReducerAction): ReducerState {
    switch (action.type) {
      case "set_value":
        return {
          ...state,
          [action.payload.category]: {
            ...state[action.payload.category],
            value: action.payload.value,
          },
        };
      case "set_validity":
        return {
          ...state,
          [action.payload.category]: {
            ...state[action.payload.category],
            validity: action.payload.validity,
          },
        };
      case "reset":
        return initial_state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initial_state);
  const { present, past, present_perfect, english } = state;

  function goToNextVerb(): void {
    const current_index = all_infinitives.indexOf(infinitive);
    const next_index = current_index + 1;
    if (all_infinitives[next_index]) {
      setInfinitive(all_infinitives[next_index]);
    } else {
      setInfinitive(all_infinitives[0]);
    }
  }

  /**
   * useEffect - change verb when user solution is acceptable
   */
  useEffect((): void => {
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
      goToNextVerb();
      // clearForm();
    }
  }, [
    present.validity,
    past.validity,
    present_perfect.validity,
    english.validity,
  ]);

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
        <div>Infinitive</div>
        <h4>{infinitive}</h4>
      </InfinitiveWrapper>
      <InputBox
        header="Present"
        category={Category.present}
        value={present.value}
        validity={present.validity}
        dispatch={dispatch}
      />
      <InputBox
        header="Past"
        category={Category.past}
        value={past.value}
        validity={past.validity}
        dispatch={dispatch}
      />
      <InputBox
        header="Present Perfect"
        category={Category.present_perfect}
        value={present_perfect.value}
        validity={present_perfect.validity}
        dispatch={dispatch}
      />
      <InputBox
        header="English"
        category={Category.english}
        value={english.value}
        validity={english.validity}
        dispatch={dispatch}
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
