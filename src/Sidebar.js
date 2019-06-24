import React, { Component } from "react";
import data from "./data";

class Sidebar extends Component {
  render() {
    return (
      <div>
        {data.map(verb => {
          return (
            <div onClick={() => this.props.switchVerb(verb.infinitive)}>
              {verb.infinitive}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Sidebar;
