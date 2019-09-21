import React, { Component, Fragment } from "react";
import Verb from "../../Verb/Verb";
import Sidebar from "../../Sidebar/Sidebar";
import data from "../../../constants/data";
import { allCategories } from "../../../constants/variables";
import "./VerbsPage.css";
import Button from "react-bootstrap/Button";
import norwayFlag from "../../../assets/norwayFlag.png";
import checkmark from "../../../assets/greenCheckmark.png";
import SnakkNavbar from "../../SnakkNavbar/SnakkNavbar";

class VerbsPage extends Component {
  state = {
    data: data,
    index: 0,
    showInstructions: false
  };

  incrementIndex = () => {
    this.state.index < this.state.data.length - 1
      ? this.setState({ index: this.state.index + 1 })
      : this.setState({ index: 0 });
  };

  showCheckmark = () => {
    document.getElementById("checkmark").className = "checkmark visible";
  };

  hideCheckmark = () => {
    document.getElementById("checkmark").className = "checkmark hidden";
  };

  nextVerb = () => {
    this.incrementIndex();
    setTimeout(() => this.showCheckmark(), 20);
    setTimeout(() => this.hideCheckmark(), 800);
  };

  eraseAnswer = format => {
    document.getElementById(`attempt-${format}`).value = "";
  };

  eraseForm = () => {
    allCategories.forEach(tense => {
      this.markBlank(tense);
      this.eraseAnswer(tense);
    });
  };

  markBlank = format => {
    const attempt = document.getElementById(`attempt-${format}`);
    const correction = document.getElementById(`answer-${format}`);
    correction.innerText = "";
    attempt.style.border = "thin solid lightgrey";
  };

  selectVerb = selection => {
    let i = data.findIndex(verb => verb.infinitive === selection);
    this.setState({ index: i });

    this.eraseForm();
  };

  toggleInstructions = () =>
    this.setState({ showInstructions: !this.state.showInstructions });

  render() {
    const ToggleInstructions = () => (
      <Button variant="info" onClick={this.toggleInstructions}>
        Show instructions
      </Button>
    );

    const Instructions = () => (
      <div className="instructions">
        Fill in the blanks to conjugate the verb. Note that because of Norway’s
        varied dialects, there are sometimes several accepted ways to conjugate
        the same verb.
      </div>
    );

    const Checkmark = () => (
      <img
        id="checkmark"
        className="checkmark hidden"
        src={checkmark}
        alt="Green Checkmark"
      />
    );

    const Flag = () => (
      <img className="flag" src={norwayFlag} alt="Norway Flag" />
    );

    return (
      <Fragment>
        <SnakkNavbar />
        <div style={{ display: "flex", height: "80vh" }}>
          <Sidebar selectVerb={this.selectVerb} />
          <div className="exercise-cta">
            <div className="exercise-group">
              <Instructions />
              <div className="verb-checkmark-group">
                <Verb
                  answer={data[this.state.index]}
                  nextVerb={this.nextVerb}
                  eraseForm={this.eraseForm}
                />
                <Checkmark />
              </div>
            </div>
            <Flag />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default VerbsPage;
