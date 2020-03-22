import React, { useState, ReactElement } from "react";
import Verb from "../../Verb/Verb";
import Sidebar from "../../Sidebar/Sidebar";
import CollapsibleInstructions from "./ChildComponents/CollapsibleInstructions";
import Checkmark from "./ChildComponents/Checkmark";
import data from "../../../constants/data";
import { allCategories } from "../../../constants/variables";
import "./VerbsPage.css";
import SnakkNavbar from "../../SnakkNavbar/SnakkNavbar";

// MAIN COMPONENT
/** Page that displays the verb exercise sheet */
function VerbsPage(): ReactElement {
  const [index, setIndex] = useState(0);

  function incrementIndex() {
    index < data.length - 1 ? setIndex(index + 1) : setIndex(0);
  }

  function nextVerb(): void {
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
    eraseForm();
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
                nextVerb={nextVerb}
                eraseForm={eraseForm}
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

function eraseForm(): void {
  allCategories.forEach(tense => {
    markBlank(tense);
    eraseAnswer(tense);
  });
}

function eraseAnswer(format: string): void {
  const answer = document.getElementById(
    `attempt-${format}`
  ) as HTMLInputElement;
  answer.value = "";
}

function markBlank(format: string): void {
  const attempt = document.getElementById(`attempt-${format}`);
  const correction = document.getElementById(`answer-${format}`);
  correction && (correction.innerText = "");
  attempt && (attempt.style.border = "thin solid lightgrey");
}
