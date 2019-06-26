import React, { Component } from "react";
import Verb from "./Verb";
import Sidebar from "./Sidebar";
import data from "./data";
import { allVerbTenses } from "./constants";
import "./AppContainer.css";
import norwayFlag from "./norwayFlag.png";

class AppContainer extends Component {
  state = {
    data: data,
    index: 0
  };

  incrementIndex = () => {
    this.state.index < this.state.data.length - 1
      ? this.setState({ index: this.state.index + 1 })
      : this.setState({ index: 0 });
  };

  eraseAnswer = format => {
    document.getElementById(`attempt-${format}`).value = "";
  };

  eraseForm = () => {
    allVerbTenses.forEach(tense => {
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

  switchVerb = selection => {
    let i = data.findIndex(verb => verb.infinitive === selection);
    this.setState({ index: i });

    this.eraseForm();
  };

  render() {
    const Instructions = () => (
      <div class="instructions">Fill in the blanks to conjugate the verb.</div>
    );

    const CallToAction = () => (
      <div>
        These exercises complement "Norwegian: Verbs & Essentials of Grammar".
        It's a short book. For the serious Norwegian learner, I strongly
        recommend reading it.
      </div>
    );

    const Flag = () => <img class="flag" src={norwayFlag} alt="Norway Flag" />;

    return (
      <div style={{ display: "flex", padding: "25px", height: "100vh" }}>
        <Sidebar switchVerb={this.switchVerb} />
        <div class="exercise-cta">
          <div class="exercise-group">
            <Instructions />
            <Verb
              answer={data[this.state.index]}
              nextVerb={this.incrementIndex}
              eraseForm={this.eraseForm}
            />
          </div>
          <div class="cta-group">
            <CallToAction />
            <Flag />
          </div>
        </div>
      </div>
    );
  }
}

export default AppContainer;
