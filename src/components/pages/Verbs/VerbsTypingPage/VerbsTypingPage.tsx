import React, { useState, ReactElement, useEffect } from "react";
import Verb from "../../../Verb/Verb";
import Sidebar from "../../../Sidebar/Sidebar";
import CollapsibleInstructions from "./ChildComponents/CollapsibleInstructions/CollapsibleInstructions";
import Checkmark from "./ChildComponents/Checkmark";
import { data_array as data } from "../../../../constants/data";
import { all_input_categories } from "../../../../constants/variables";
import "./VerbsTypingPage.css";
import SnakkNavbar from "../../../SnakkNavbar/SnakkNavbar";
import { getAttemptAndCorrectionElements } from "../../../../tools";
import { VerbSolution } from "../../../../interfaces/interfaces";
import styled from "styled-components";
import { theme } from "../../../../theme";

// Styled components

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

// MAIN COMPONENT
/** Page that displays the verb exercise sheet */
export default function VerbsTypingPage(): ReactElement {
  const [index, setIndex] = useState(0);

  function incrementIndex() {
    index < data.length - 1 ? setIndex(index + 1) : setIndex(0);
  }

  function loadNextVerb(): void {
    incrementIndex();
    congratulate();
  }

  function congratulate(): void {
    setTimeout(() => showCheckmark(), 20);
    setTimeout(() => hideCheckmark(), 800);
  }

  function selectVerb({
    selection,
    letter,
  }: {
    selection?: string;
    letter?: string;
  }): void {
    let i;
    if (selection) {
      i = data.findIndex((verb) => verb.infinitive === selection);
    } else if (letter) {
      i = data.findIndex((verb) => verb.infinitive[0] === letter.toLowerCase());
    }
    if (!i) {
      i = 0;
    }
    setIndex(i);
    eraseMarkings();
  }

  return (
    <>
      <SnakkNavbar />
      <CollapsibleInstructions />
      <BodyWrapper>
        <Sidebar selectVerb={selectVerb} />
        <ExerciseGroup>
          <VerbCheckmarkGroup>
            <Verb
              answer={data[index]}
              loadNextVerb={loadNextVerb}
              eraseMarkings={eraseMarkings}
            />
            <Checkmark />
          </VerbCheckmarkGroup>
        </ExerciseGroup>
      </BodyWrapper>
    </>
  );
}

// HELPERS
function showCheckmark(): void {
  const checkmark = document.getElementById("checkmark") as HTMLInputElement;
  checkmark.className = "checkmark visible";
}

function hideCheckmark(): void {
  const checkmark = document.getElementById("checkmark") as HTMLInputElement;
  checkmark.className = "checkmark hidden";
}

function eraseMarkings(): void {
  all_input_categories.forEach((tense) => {
    markBlank(tense as keyof VerbSolution);
  });
}

function markBlank(category: keyof VerbSolution): void {
  const { attempt, correction } = getAttemptAndCorrectionElements({ category });
  attempt.value = "";
  correction.innerText = "";
  attempt.className = "clean-verb";
}
