import React, { Component } from "react";

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

  allAnswersCorrect = () => {
    return Object.keys(this.state).every(
      verbTense => this.state[verbTense] === true
    );
  };

  revealAnswers = () => {
    ["present", "past", "present-perfect", "english"].forEach(verbTense =>
      this.revealAnswer(verbTense)
    );
    console.log(this.state);
  };

  revealAnswer = format => {
    const attempt = document.getElementById(`attempt-${format}`).value;
    const answer = this.props.answer[format];
    attempt !== answer ? this.markIncorrect(format) : this.markCorrect(format);
  };

  markIncorrect = format => {
    const attempt = document.getElementById(`attempt-${format}`);
    const correction = document.getElementById(`answer-${format}`);
    correction.innerText = this.props.answer[format];
    attempt.style.border = "thick solid red";
    this.setState({ [format]: false });
  };

  markCorrect = format => {
    const attempt = document.getElementById(`attempt-${format}`);
    const correction = document.getElementById(`answer-${format}`);
    correction.innerText = "";
    attempt.style.border = "none";
    this.setState({ [format]: true });
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
              <button onClick={this.revealAnswers}>Submit</button>
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
        {this.allAnswersCorrect() && <button>Continue</button>}
      </table>
    );
  }
}

export default Verb;
