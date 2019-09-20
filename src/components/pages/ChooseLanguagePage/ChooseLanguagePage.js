import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./ChooseLanguagePage.css";
import norwayFlag from "../../../assets/norwayFlag.png";
import swedenFlag from "../../../assets/swedenFlag.png";
import denmarkFlag from "../../../assets/denmarkFlag.png";
import SnakkNavbar from "../../SnakkNavbar/SnakkNavbar";

class ChooseLanguagePage extends Component {
  render() {
    const Header = () => (
      <React.Fragment>
        <h1>Let's begin.</h1>
        <h3>What are you learning?</h3>
      </React.Fragment>
    );

    return (
      <Fragment>
        <SnakkNavbar />
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
      </Fragment>
    );
  }
}

export default ChooseLanguagePage;
