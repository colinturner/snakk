import React, { Component } from "react";
import data from "../../constants/data";
import "./Sidebar.css";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        {data.map(verb => {
          return (
            <div
              key={`${verb.infinitive} --> ${verb.english}`}
              style={{ cursor: "pointer" }}
              onClick={() => this.props.selectVerb(verb.infinitive)}
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
