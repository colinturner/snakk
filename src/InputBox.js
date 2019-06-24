import React, { Component } from "react";

class InputBox extends Component {
  render() {
    const formatID = str => str.replace(/ +/g, "-").toLowerCase();
    return (
      <div>
        <div>{this.props.header}</div>
        <input id={`attempt-${formatID(this.props.header)}`} />
        <div id={`answer-${formatID(this.props.header)}`} />
      </div>
    );
  }
}

export default InputBox;
