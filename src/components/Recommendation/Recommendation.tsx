import React from "react";
import "./Recommendation.css";
import { Container, Row, Col } from "react-bootstrap";

interface Image {
  alt: string;
  src: string;
  href: string;
}

interface RecommendationProps {
  image: Image;
  category: string;
  description: string;
  title: string;
}

function Recommendation(props: RecommendationProps) {
  const { image, description, title, category } = props;
  const Category = () => <div className="category">{category}</div>;
  const Image = () => (
    <a href={image.href} target="_blank" rel="noopener noreferrer">
      <img className="recommendation-image" alt={image.alt} src={image.src} />
    </a>
  );

  const Title = () => (
    <a href={image.href} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  );

  const Description = () => <div>{description}</div>;

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

export default Recommendation;
