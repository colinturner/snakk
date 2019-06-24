import React, { Component } from "react";
import { allVerbTenses } from "./constants";
import Button from "react-bootstrap/Button";
import "./Verb.css";
import InputBox from "./InputBox";

class Verb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      present: false,
      past: false,
      "present-perfect": false,
      english: false
    };
  }

  checkAnswers = () => {
    allVerbTenses.every(verbTense => this.checkAnswer(verbTense))
      ? this.nextVerb()
      : allVerbTenses.forEach(verbTense => this.checkAnswer(verbTense));
  };

  checkAnswer = format => {
    const attempt = document.getElementById(`attempt-${format}`).value;
    const answer = this.props.answer[format];
    attempt === answer ? this.markCorrect(format) : this.markIncorrect(format);
    return attempt === answer;
  };

  markIncorrect = format => {
    const attempt = document.getElementById(`attempt-${format}`);
    const correction = document.getElementById(`answer-${format}`);
    correction.innerText = this.props.answer[format];
    attempt.style.border = "medium solid red";
    this.setState({ [format]: false });
  };

  markCorrect = format => {
    this.props.markCorrect(format);
    this.setState({ [format]: true });
  };

  eraseAnswer = format => {
    document.getElementById(`attempt-${format}`).value = "";
  };

  nextVerb = () => {
    this.props.nextVerb();
    this.props.eraseForm();
  };

  render() {
    const Infinitive = () => {
      return (
        <div style={{ margin: "5px" }}>
          <div>Infinitive</div>
          <div style={{ "font-weight": "bold" }}>
            {this.props.answer.infinitive}
          </div>
        </div>
      );
    };

    return (
      <div style={{ display: "flex", margin: "100px 0px 0px 25px" }}>
        <Infinitive />
        <InputBox header="Present" />
        <InputBox header="Past" />
        <InputBox header="Present Perfect" />
        <InputBox header="English" />
        <Button style={{ margin: "5px" }} onClick={this.checkAnswers}>
          Submit
        </Button>
      </div>
    );
  }
}

export default Verb;
