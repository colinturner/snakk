import React, { useState, ReactElement, useEffect } from "react";
import Verb from "../../Verb/Verb";
import Sidebar from "../../Sidebar/Sidebar";
import CollapsibleInstructions from "./ChildComponents/CollapsibleInstructions/CollapsibleInstructions";
import Checkmark from "./ChildComponents/Checkmark";
import data from "../../../constants/data";
import { all_input_categories } from "../../../constants/variables";
import "./VerbsPage.css";
import SnakkNavbar from "../../SnakkNavbar/SnakkNavbar";
import { getAttemptAndCorrectionElements } from "../../../tools";
import { VerbSolution } from "../../../interfaces/interfaces";

// MAIN COMPONENT
/** Page that displays the verb exercise sheet */
function VerbsPage(): ReactElement {
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

  function selectVerb(selection: string): void {
    let i = data.findIndex(verb => verb.infinitive === selection);
    setIndex(i);
    eraseMarkings();
  }

  return (
    <>
      <SnakkNavbar />
      <CollapsibleInstructions />
      <div className="body-wrapper">
        <Sidebar selectVerb={selectVerb} />
        <div className="exercise-cta">
          <div className="exercise-group">
            <div className="verb-checkmark-group">
              <Verb
                answer={data[index]}
                loadNextVerb={loadNextVerb}
                eraseMarkings={eraseMarkings}
              />
              <Checkmark />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerbsPage;

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
  all_input_categories.forEach(tense => {
    markBlank(tense as keyof VerbSolution);
  });
}

function markBlank(category: keyof VerbSolution): void {
  const { attempt, correction } = getAttemptAndCorrectionElements({ category });
  attempt.value = "";
  correction.innerText = "";
  attempt.className = "clean-verb";
}
