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
    if (allVerbTenses.every(verbTense => this.checkAnswer(verbTense))) {
      this.nextVerb();
    } else {
      allVerbTenses.forEach(verbTense => this.checkAnswer(verbTense));
    }
  };

  prepareString = str => {
    return str.toLowerCase().trim();
  };

  checkAnswer = format => {
    const attempt = this.prepareString(
      document.getElementById(`attempt-${format}`).value
    );
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
    const attempt = document.getElementById(`attempt-${format}`);
    const correction = document.getElementById(`answer-${format}`);
    correction.innerText = "";
    attempt.style.border = "medium solid green";
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
          <h4>{this.props.answer.infinitive}</h4>
        </div>
      );
    };

    return (
      <div class="verb">
        <Infinitive />
        <InputBox header="Present" />
        <InputBox header="Past" />
        <InputBox header="Present Perfect" />
        <InputBox header="English" />
        <Button
          style={{ margin: "5px", width: "80px" }}
          onClick={this.checkAnswers}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default Verb;
