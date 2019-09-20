import React, { Component } from "react";
import "./Recommendation.css";
import { Container, Row, Col } from "react-bootstrap";

class Recommendation extends Component {
  render() {
    const Category = () => (
      <div className="category">{this.props.category}</div>
    );
    const Image = () => (
      <a href={this.props.image.href} target="_blank" rel="noopener noreferrer">
        <img
          className="recommendation-image"
          alt={this.props.image.alt}
          src={this.props.image.src}
        />
      </a>
    );

    const Title = () => (
      <a href={this.props.image.href} target="_blank" rel="noopener noreferrer">
        {this.props.title}
      </a>
    );

    const Description = () => <div>{this.props.description}</div>;

    return (
      <div className="recommendation-container">
        <Container>
          <Category />
          <Row>
            <Col style={{ maxWidth: "230px" }} xs={12} md={6} lg={12} xl={6}>
              <Image />
            </Col>
            <Col>
              <Title />
              <Description />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Recommendation;
