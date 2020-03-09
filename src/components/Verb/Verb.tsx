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

  neutralizeString = str => {
    return str.toLowerCase().trim();
  };

  checkMultiplePossibleSolutions = (attempt, answer) => {
    let att = attempt.split(",").map(phrase => phrase.trim());
    let ans = answer.split(",").map(phrase => phrase.trim());

    const partialSolution = (att, ans) => {
      return att.every(v => ans.includes(v));
    };

    const completeSolution = (att, ans) => {
      return partialSolution(att, ans) && att.length === ans.length;
    };

    if (completeSolution(att, ans)) {
      return "complete solution";
    } else if (partialSolution(att, ans)) {
      return "partial solution";
    }
    return false;
  };

  checkAnswers = () => {
    if (allCategories.every(category => this.checkAnswer(category))) {
      this.nextVerb();
    } else {
      allCategories.forEach(category => this.checkAnswer(category));
    }
  };

  checkAnswer = category => {
    const attempt = this.neutralizeString(
      document.getElementById(`attempt-${category}`).value
    );
    const answer = this.props.answer[category];
    switch (this.checkMultiplePossibleSolutions(attempt, answer)) {
      case "complete solution":
        return this.markCorrect(category);
      case "partial solution":
        return this.markPartiallyCorrect(category);
      default:
        return this.markIncorrect(category);
    }
  };

  markIncorrect = category => {
    const attempt = document.getElementById(`attempt-${category}`);
    const correction = document.getElementById(`answer-${category}`);
    correction.style.color = "darkRed";
    correction.innerText = this.props.answer[category];
    attempt.style.border = "medium solid red";
    this.setState({ [category]: false });
    return false;
  };

  markCorrect = category => {
    const attempt = document.getElementById(`attempt-${category}`);
    const correction = document.getElementById(`answer-${category}`);
    correction.innerText = "";
    attempt.style.border = "medium solid green";
    this.setState({ [category]: true });
    return true;
  };

  markPartiallyCorrect = category => {
    const attempt = document.getElementById(`attempt-${category}`);
    const correction = document.getElementById(`answer-${category}`);
    correction.style.color = "green";
    correction.innerText = this.props.answer[category];
    attempt.style.border = "medium dotted green";
    this.setState({ [category]: true });
    return true;
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
      <div className="verb">
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
