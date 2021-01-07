import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../../../theme";
import SnakkNavbar from "../../../SnakkNavbar/SnakkNavbar";

interface ICard {
  text: string;
  onClick: () => void;
}

const MainSection = styled.div`
  display: flex;
  @media ${theme.device.mobile} {
    flex-direction: column;
    margin-top: 144px;
  }
  @media ${theme.device.tablet} {
    flex-direction: row;
    justify-content: center;
    margin-top: 160px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: ${theme.colors.white};
  padding: 40px;
  ${theme.shadow.topLeft};
  cursor: pointer;
  @media ${theme.device.mobile} {
    margin: 8px;
    height: 160px;
  }
  @media ${theme.device.tablet} {
    margin: 0px 8px;
    width: 264px;
    height: 200px;
  }
`;

const CardText = styled.div`
  font-weight: 600;
  font-size: 29px;
`;

export default function VerbsPage(): ReactElement {
  const history = useHistory();

  return (
    <>
      <SnakkNavbar />
      <MainSection>
        <Card
          text="⌨️ Typing"
          onClick={(): void => history.push("/verbs/typing")}
        />
        <Card
          text="⚡ Flashcards"
          onClick={(): void => history.push("/verbs/flashcards")}
        />
      </MainSection>
    </>
  );
}

function Card(props: ICard): ReactElement {
  const { text, onClick } = props;
  return (
    <CardWrapper onClick={onClick}>
      <CardText>{text}</CardText>
    </CardWrapper>
  );
}
