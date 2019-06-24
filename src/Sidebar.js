import React, { Component } from "react";
import data from "./data";

class Sidebar extends Component {
  render() {
    return (
      <div style={{ "padding-left": "40px" }}>
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
