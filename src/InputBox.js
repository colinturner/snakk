import React, { Component } from "react";

class InputBox extends Component {
  render() {
    const formatID = str => str.replace(/ +/g, "-").toLowerCase();
    return (
      <div style={{ margin: "5px" }}>
        <div style={{ color: "darkblue" }}>{this.props.header}</div>
        <input id={`attempt-${formatID(this.props.header)}`} />
        <div
          style={{ color: "darkred" }}
          id={`answer-${formatID(this.props.header)}`}
        />
      </div>
    );
  }
}

export default InputBox;
