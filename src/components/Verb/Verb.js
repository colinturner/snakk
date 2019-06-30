import React, { Component } from "react";
import { allCategories } from "../../constants/variables";
import Button from "react-bootstrap/Button";
import "./Verb.css";
import InputBox from "../InputBox/InputBox";

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
    if (allCategories.every(category => this.checkAnswer(category))) {
      this.nextVerb();
    } else {
      allCategories.forEach(category => this.checkAnswer(category));
    }
  };

  neutralizeString = str => {
    return str.toLowerCase().trim();
  };

  checkAnswer = category => {
    const attempt = this.neutralizeString(
      document.getElementById(`attempt-${category}`).value
    );
    const answer = this.props.answer[category];
    attempt === answer
      ? this.markCorrect(category)
      : this.markIncorrect(category);
    return attempt === answer;
  };

  markIncorrect = category => {
    const attempt = document.getElementById(`attempt-${category}`);
    const correction = document.getElementById(`answer-${category}`);
    correction.innerText = this.props.answer[category];
    attempt.style.border = "medium solid red";
    this.setState({ [category]: false });
  };

  markCorrect = category => {
    const attempt = document.getElementById(`attempt-${category}`);
    const correction = document.getElementById(`answer-${category}`);
    correction.innerText = "";
    attempt.style.border = "medium solid green";
    this.setState({ [category]: true });
  };

  eraseAnswer = category => {
    document.getElementById(`attempt-${category}`).value = "";
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
