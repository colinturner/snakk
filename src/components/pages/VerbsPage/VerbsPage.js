import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import Verb from "../../Verb/Verb";
import Sidebar from "../../Sidebar/Sidebar";
import data from "../../../constants/data";
import { allCategories } from "../../../constants/variables";
import "./VerbsPage.css";
import Button from "react-bootstrap/Button";
import norwayFlag from "../../../assets/norwayFlag.png";
import checkmark from "../../../assets/greenCheckmark.png";
import SnakkNavbar from "../../SnakkNavbar/SnakkNavbar";

function VerbsPage() {
  const [index, setIndex] = useState(0);
  function incrementIndex() {
    index < data.length - 1 ? setIndex(index + 1) : setIndex(0);
  }

  function nextVerb() {
    incrementIndex();
    setTimeout(() => showCheckmark(), 20);
    setTimeout(() => hideCheckmark(), 800);
  }

  function selectVerb(selection) {
    let i = data.findIndex(verb => verb.infinitive === selection);
    setIndex(i);

    eraseForm();
  }

  return (
    <>
      <SnakkNavbar />
      <CollapsibleInstructions />
      <div style={{ display: "flex", height: "80vh", marginTop: "20px" }}>
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
          <Flag />
        </div>
      </div>
    </>
  );
}

function showCheckmark() {
  document.getElementById("checkmark").className = "checkmark visible";
}

function hideCheckmark() {
  document.getElementById("checkmark").className = "checkmark hidden";
}

function eraseAnswer(format) {
  document.getElementById(`attempt-${format}`).value = "";
}

function eraseForm() {
  allCategories.forEach(tense => {
    markBlank(tense);
    eraseAnswer(tense);
  });
}

function markBlank(format) {
  const attempt = document.getElementById(`attempt-${format}`);
  const correction = document.getElementById(`answer-${format}`);
  correction.innerText = "";
  attempt.style.border = "thin solid lightgrey";
}

function Checkmark() {
  return (
    <img
      id="checkmark"
      className="checkmark hidden"
      src={checkmark}
      alt="Green Checkmark"
    />
  );
}

function Flag() {
  return <img className="flag" src={norwayFlag} alt="Norway Flag" />;
}

function CollapsibleInstructions() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="instructions"
        aria-expanded={open}
        variant="info"
      >
        {open ? "Hide instructions" : "Show instructions"}
      </Button>
      <Collapse in={open}>
        <div id="instructions">
          Fill in the blanks to conjugate the verb. Note that because of
          Norway’s varied dialects, there are sometimes several accepted ways to
          conjugate the same verb.
        </div>
      </Collapse>
    </>
  );
}

export default VerbsPage;
