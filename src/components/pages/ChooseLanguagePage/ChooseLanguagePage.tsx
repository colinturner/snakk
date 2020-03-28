import React, { Component, ReactElement } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./ChooseLanguagePage.css";
import norwayFlag from "../../../assets/norwayFlag.png";
import swedenFlag from "../../../assets/swedenFlag.png";
import denmarkFlag from "../../../assets/denmarkFlag.png";
import styled, { keyframes } from "styled-components";
const { slideInLeft }: any = require("react-animations");

function ChooseLanguagePage() {
  const SlideInLeftAnimation = keyframes`${slideInLeft}`;

  const SlideInHeaderOne = styled.h1`
    animation: 0.7s ${SlideInLeftAnimation};
    padding-left: 20px;
  `;

  const SlideInHeaderTwo = styled.h2`
    animation: 1.7s ${SlideInLeftAnimation};
    padding-left: 20px;
  `;

  const StyledButton = styled(Button)`
    border-radius: 40px;
    margin: 10px;
  `;

  const Language = styled.div`
    font-family: Bree Serif;
    font-size: 20px;
  `;

  const Quip = styled.div`
    font-family: Roboto;
  `;

  interface FlagChoiceProps {
    available: boolean;
    flag: string;
    flag_name: string;
    language: string;
    quip: string;
  }

  function FlagChoice(props: FlagChoiceProps): ReactElement {
    const { available, flag, flag_name, language, quip } = props;
    return (
      <StyledButton
        disabled={!available}
        href="#learn"
        variant="light"
        className="flagButton"
      >
        <img className="imageFlagButton" src={flag} alt={`${flag_name} flag`} />
        <Language>{language}</Language>
        <Quip>{available ? quip : "Under development! Check back soon."}</Quip>
      </StyledButton>
    );
  }

  return (
    <>
      <SlideInHeaderOne>Let's begin.</SlideInHeaderOne>
      <SlideInHeaderTwo>What are you learning?</SlideInHeaderTwo>
      <Container>
        <Row>
          <FlagChoice
            flag={norwayFlag}
            flag_name="Norwegian"
            language="Norwegian"
            available={true}
            quip="A fine choice."
          />
          <FlagChoice
            flag={swedenFlag}
            flag_name="Swedish"
            language="Swedish"
            available={false}
            quip="How grand."
          />
          <FlagChoice
            flag={denmarkFlag}
            flag_name="Danish"
            language="Danish"
            available={false}
            quip="Get ready to gargle sounds."
          />
        </Row>
      </Container>
    </>
  );
}

export default ChooseLanguagePage;
