import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./ChooseLanguagePage.css";
import norwayFlag from "../../../assets/norwayFlag.png";
import swedenFlag from "../../../assets/swedenFlag.png";
import denmarkFlag from "../../../assets/denmarkFlag.png";

class ChooseLanguagePage extends Component {
  render() {
    const Header = () => (
      <React.Fragment>
        <h1>Let's get started.</h1>
        <h3>What are you learning?</h3>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Header />
        <Container>
          <Row>
            <Col>
              <img src={norwayFlag} alt="Norwegian Flag" />
            </Col>
            <Col>
              <img src={swedenFlag} alt="Swedish Flag" />
            </Col>
            <Col>
              <img src={denmarkFlag} alt="Danish Flag" />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default ChooseLanguagePage;
