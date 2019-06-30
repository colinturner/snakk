import React, { Component } from "react";
import Verb from "./Verb";
import Sidebar from "./Sidebar";
import data from "./constants/data";
import { allCategories } from "./constants/variables";
import "./AppContainer.css";
import norwayFlag from "./assets/norwayFlag.png";
import checkmark from "./assets/greenCheckmark.png";

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

  render() {
    const Instructions = () => (
      <div class="instructions">Fill in the blanks to conjugate the verb.</div>
    );

    const CallToAction = () => (
      <div>
        These exercises complement{" "}
        <a
          style={{ "font-style": "italic" }}
          href="https://amzn.to/2IUGzWY"
          target="_blank"
          rel="noopener noreferrer"
        >
          Norwegian Verbs & Essentials of Grammar
        </a>
        . It's a short book. For the serious Norwegian learner, I strongly
        recommend reading it.
      </div>
    );

    const Checkmark = () => (
      <img
        id="checkmark"
        class="checkmark hidden"
        src={checkmark}
        alt="Green Checkmark"
      />
    );

    const Flag = () => <img class="flag" src={norwayFlag} alt="Norway Flag" />;

    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar selectVerb={this.selectVerb} />
        <div class="exercise-cta">
          <div class="exercise-group">
            <Instructions />
            <div class="verb-checkmark-group">
              <Verb
                answer={data[this.state.index]}
                nextVerb={this.nextVerb}
                eraseForm={this.eraseForm}
              />
              <Checkmark />
            </div>
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
