import React, { Component, Fragment, useState } from "react";
import Recommendation from "../../Recommendation/Recommendation";
import { Container, Row, Col } from "react-bootstrap";
import data from "../../../constants/data";
import "./AdditionalResourcesPage.css";
import norwegianGrammar from "../../../assets/norwegianGrammar.jpg";
import mysteryNilsPart1 from "../../../assets/mysteryNilsPart1.jpg";
import mysteryNilsPart2 from "../../../assets/mysteryNilsPart2.jpg";
import norwegianDictionary from "../../../assets/norwegianDictionary.jpg";
import SnakkNavbar from "../../SnakkNavbar/SnakkNavbar";

function AdditionalResourcesPage() {
  const Header = () => (
    <h4 style={{ fontFamily: "Roboto" }}>
      Learned enough verbs? These resources can take your Norwegian to the next
      level.
    </h4>
  );

  const NorwegianBeginnerBook = () => (
    <Recommendation
      category="Best all-around beginner book"
      image={{
        href: "https://amzn.to/2O9HZjn",
        alt: "The Mystery of Nils. Part 1",
        src: mysteryNilsPart1
      }}
      title="The Mystery of Nils. Part 1"
      description="This is not a traditional textbook. It’s an actual story that has you reading Norwegian from the get-go. The vocabulary is deliberately chosen to build your knowledge as you go. Norwegian lessons are interspersed between story chapters. Read this one slowly, with purpose, and with a pen handy - it will take you far."
    />
  );

  const NorwegianIntermediateBook = () => (
    <Recommendation
      category="Best all-around intermediate book"
      image={{
        href: "https://amzn.to/2NpfNcS",
        alt: "Mysteriet om Nils. Part 2",
        src: mysteryNilsPart2
      }}
      title="Mysteriet om Nils. Part 2"
      description="This book continues where Part I left off, deepening the learner’s grasp of Norwegian as it moves into the finer nuances of the language and heads into more advanced vocabulary."
    />
  );

  const NorwegianGrammarBook = () => (
    <Recommendation
      category="Best grammar book"
      image={{
        href: "https://amzn.to/31ztxFd",
        alt: "Louis Janus - Norwegian Verbs & Essentials of Grammar",
        src: norwegianGrammar
      }}
      title="Norwegian Verbs & Essentials of Grammar"
      description="This guide provides a comprehensive overview of the grammar and a deep-dive into the nuances of verb conjugation in Norwegian. Recommended as a supplement to this website."
    />
  );

  const NorwegianDictionaryBook = () => (
    <Recommendation
      category="Best Norwegian-English travel dictionary"
      image={{
        href: "https://amzn.to/2ObCPUa",
        alt: "Norwegian Pocket Dictionary Berlitz",
        src: norwegianDictionary
      }}
      title="Norwegian Pocket Dictionary Berlitz"
      description="The selection is honestly not great on Norwegian-English physical dictionaries. This one is fairly decent though: small enough and translates in both directions."
    />
  );
  return (
    <Fragment>
      <SnakkNavbar />
      <Header />
      <Container>
        <Row>
          <Col md={12} lg={6}>
            <NorwegianBeginnerBook />
          </Col>
          <Col md={12} lg={6}>
            <NorwegianIntermediateBook />
          </Col>
          <Col md={12} lg={6}>
            <NorwegianGrammarBook />
          </Col>
          <Col md={12} lg={6}>
            <NorwegianDictionaryBook />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default AdditionalResourcesPage;
