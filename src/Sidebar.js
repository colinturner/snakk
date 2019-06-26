import React, { Component } from "react";
import data from "./data";

class Sidebar extends Component {
  render() {
    return (
      <div
        style={{
          padding: "0px 40px",
          "max-height": "550px",
          "min-width": "145px",
          "overflow-y": "auto",
          "background-color": "aliceblue",
          "border-radius": "20px"
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
