import React from "react";
import Verb from "./Verb";
import data from "./data";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Verb answer={data.pop()} />
      </header>
    </div>
  );
}

export default App;
