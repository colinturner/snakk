import React, { Component } from "react";
import { Row, Button } from "react-bootstrap";
import "./HomePage.css";
import rocketShip from "../../../assets/rocketship.png";

class HomePage extends Component {
  render() {
    const HeaderOne = () => (
      <div
        style={{
          fontFamily: "Oswald",
          fontSize: "25px",
          marginTop: "70px"
        }}
      >
        Welcome to
      </div>
    );

    const Title = () => (
      <div
        style={{
          fontFamily: "Roboto",
          fontSize: "90px",
          fontWeight: "bold",
          lineHeight: "90px"
        }}
      >
        SNAKK
      </div>
    );

    const HeaderTwo = () => (
      <div
        style={{
          fontFamily: "Oswald",
          fontSize: "15px",
          marginTop: "130px",
          marginBottom: "20px"
        }}
      >
        The world's best place to learn Scandinavian languages
      </div>
    );

    const GetStartedButton = () => (
      <Button
        href="#languages"
        style={{
          fontFamily: "Bree Serif",
          fontSize: "30px"
        }}
        variant="success"
      >
        Get started
        <img className="rocket-ship" src={rocketShip} alt="Rocket ship emoji" />
      </Button>
    );

    return (
      <div className="homePageContent">
        <Row style={{ justifyContent: "center" }}>
          <HeaderOne />
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Title />
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <HeaderTwo />
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <GetStartedButton />
        </Row>
      </div>
    );
  }
}

export default HomePage;