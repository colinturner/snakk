import React, { Component } from "react";
import "./HomePage.css";

class HomePage extends Component {
  render() {
    const Header = () => (
      <React.Fragment>
        <h1>Welcome to Snakk!</h1>
        <h2>The world's best place to learn Scandinavian languages</h2>
      </React.Fragment>
    );

    return <Header />;
  }
}

export default HomePage;
