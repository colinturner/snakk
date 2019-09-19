import React, { Component } from "react";
import "./Recommendation.css";

class Recommendation extends Component {
  render() {
    const Category = () => <div class="category">{this.props.category}</div>;
    const Image = () => (
      <a href={this.props.image.href} target="_blank" rel="noopener noreferrer">
        <img
          class="recommendation-image"
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
      <div class="recommendationContainer">
        <Category />
        <div style={{ display: "flex" }}>
          <Image />
          <div class="title-description">
            <Title />
            <Description />
          </div>
        </div>
      </div>
    );
  }
}

export default Recommendation;
