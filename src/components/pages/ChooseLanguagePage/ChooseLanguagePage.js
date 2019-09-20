import React, { Component, Fragment } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./ChooseLanguagePage.css";
import norwayFlag from "../../../assets/norwayFlag.png";
import swedenFlag from "../../../assets/swedenFlag.png";
import denmarkFlag from "../../../assets/denmarkFlag.png";

class ChooseLanguagePage extends Component {
  render() {
    const Header = () => (
      <Fragment>
        <h1>Let's begin.</h1>
        <h3>What are you learning?</h3>
      </Fragment>
    );

    const Choice = props => (
      <Button
        disabled={!props.available}
        href="#learn"
        variant="light"
        style={{ borderRadius: "40px", margin: "10px" }}
        className="flagButton"
      >
        <img
          className="imageFlagButton"
          src={props.flag}
          alt={`${props.flagName} flag`}
        />
        <div style={{ fontFamily: "Bree Serif", fontSize: "20px" }}>
          {props.language}
        </div>
        {props.available ? (
          <div style={{ fontFamily: "Roboto" }}>{props.quip}</div>
        ) : (
          <div style={{ fontFamily: "Roboto" }}>
            Under development! Check back soon.
          </div>
        )}
      </Button>
    );

    return (
      <Fragment>
        <Header />
        <Container>
          <Row>
            <Choice
              flag={norwayFlag}
              flagName="Norwegian"
              language="Norwegian"
              available={true}
              quip="A fine choice."
            />
            <Choice
              flag={swedenFlag}
              flagName="Swedish"
              language="Swedish"
              available={false}
              quip="How grand."
            />
            <Choice
              flag={denmarkFlag}
              flagName="Danish"
              language="Danish"
              available={false}
              quip="Get ready to gargle sounds."
            />
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default ChooseLanguagePage;
