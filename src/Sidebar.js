import React, { Component } from "react";
import data from "./data";

class Sidebar extends Component {
  render() {
    return (
      <div
        style={{
          "padding-left": "40px",
          "max-height": "550px",
          "overflow-y": "auto",
          "min-width": "20%",
          "background-color": "aliceblue"
        }}
      >
        {data.map(verb => {
          return (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => this.props.switchVerb(verb.infinitive)}
            >
              {verb.infinitive}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Sidebar;
