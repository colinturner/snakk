import React, { Component } from "react";
import { allVerbTenses } from "./constants";
import Button from "react-bootstrap/Button";

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
    attempt.style.border = "thick solid red";
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
    return (
      <table>
        <tbody>
          <tr>
            <th>Infinitive</th>
            <th>Present</th>
            <th>Past</th>
            <th>Present Perfect</th>
            <th>English</th>
            <th>Submit</th>
          </tr>

          <tr>
            <td>
              <p>{this.props.answer.infinitive}</p>
            </td>
            <td>
              <input id="attempt-present" />
            </td>
            <td>
              <input id="attempt-past" />
            </td>
            <td>
              <input id="attempt-present-perfect" />
            </td>
            <td>
              <input id="attempt-english" />
            </td>
            <td>
              <Button onClick={this.checkAnswers}>Submit</Button>
            </td>
          </tr>

          <tr>
            <td />
            <td id="answer-present" />
            <td id="answer-past" />
            <td id="answer-present-perfect" />
            <td id="answer-english" />
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Verb;
