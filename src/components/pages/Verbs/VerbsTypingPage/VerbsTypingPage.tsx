import React, { useState, ReactElement, useEffect } from "react";
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
 * Styled components
 */
const BodyWrapper = styled.div`
  display: flex;
  padding-left: 20px;
  height: 80vh;
  margin-top: 20px;
`;

const ExerciseGroup = styled.div`
  @media ${theme.device.mobile} {
    max-width: 185px;
  }
  @media ${theme.device.tablet} {
    margin-top: 140px;
  }
`;

const VerbCheckmarkGroup = styled.div`
  @media ${theme.device.mobile} {
    position: relative;
  }
  @media ${theme.device.tablet} {
    display: flex;
  }
`;

export type IInfinitive = keyof typeof verbs;

/**
 * Page component
 */
export default function VerbsTypingPage(): ReactElement {
  /**
   * State
   */
  const all_infinitives = (Object.keys(verbs) as IInfinitive[]).sort();
  const [infinitive, setInfinitive] = useState(all_infinitives[0]);
  const [verb, setVerb] = useState(verbs[infinitive]);

  // Set verb when infinitive changes
  useEffect((): void => {
    setVerb(verbs[infinitive]);
  }, [infinitive]);

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
        <ExerciseGroup>
          <VerbCheckmarkGroup>
            <Verb
              verb={verb}
              infinitive={infinitive}
              setInfinitive={setInfinitive}
            />
            <Checkmark />
          </VerbCheckmarkGroup>
        </ExerciseGroup>
      </BodyWrapper>
    </>
  );
}
