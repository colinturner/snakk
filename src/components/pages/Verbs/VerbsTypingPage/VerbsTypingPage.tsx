import React, { useState, ReactElement, useEffect, useReducer } from "react";
import Verb from "../../../Verb/Verb";
import Sidebar from "../../../Sidebar/Sidebar";
import CollapsibleInstructions from "./ChildComponents/CollapsibleInstructions/CollapsibleInstructions";
import Checkmark from "./ChildComponents/Checkmark";
import { data_json as verbs } from "../../../../constants/data";
import { all_input_categories } from "../../../../constants/variables";
import "./VerbsTypingPage.css";
import SnakkNavbar from "../../../SnakkNavbar/SnakkNavbar";
import { getAttemptAndCorrectionElements } from "../../../../tools";
import { VerbSolution } from "../../../../interfaces/interfaces";
import styled from "styled-components";
import { theme } from "../../../../theme";

/**
 * Interfaces
 */
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
export interface ReducerState {
  present: FieldState;
  past: FieldState;
  present_perfect: FieldState;
  english: FieldState;
}

export type IInfinitive = keyof typeof verbs;

/**
 * Styled components
 */
const BodyWrapper = styled.div`
  display: flex;
  padding-left: 20px;
  height: 80vh;
  margin-top: 20px;
`;

/**
 * Component
 */
export default function VerbsTypingPage(): ReactElement {
  /**
   * State
   */
  const all_infinitives = (Object.keys(verbs) as IInfinitive[]).sort();
  const [infinitive, setInfinitive] = useState(all_infinitives[0]);
  const [verb, setVerb] = useState(verbs[infinitive]);

  /**
   * Effect
   */
  useEffect((): void => {
    setVerb(verbs[infinitive]);
  }, [infinitive]);

  /**
   * Reducer
   */
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

  /**
   * Render
   */
  return (
    <>
      <SnakkNavbar />
      <CollapsibleInstructions />
      <BodyWrapper>
        <Sidebar
          setInfinitive={setInfinitive}
          all_infinitives={all_infinitives}
        />
        <Verb
          key={infinitive}
          state={state}
          dispatch={dispatch}
          verb={verb}
          infinitive={infinitive}
          all_infinitives={all_infinitives}
          setInfinitive={setInfinitive}
        />
      </BodyWrapper>
    </>
  );
}
